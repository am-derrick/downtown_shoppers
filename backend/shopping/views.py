from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ShoppingList
from .serializers import ShoppingListSerializer, QuoteSerializer
from drf_spectacular.utils import extend_schema, extend_schema_view
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings

@extend_schema_view(
    create=extend_schema(
        description='Create a new shopping list',
        summary='Create shopping list',
        tags=['Shopping lists']
    ),
    status=extend_schema(
        description='Get the current status of a shopping list',
        summary='Check list status',
        tags=['Shopping Lists']
    ),
    accept_quote=extend_schema(
        description='Accept a quote for a shopping list',
        summary='Accept quote',
        tags=['Quotes']
    )
)

@method_decorator(csrf_exempt, name='dispatch')
class ShoppingListViewSet(viewsets.ModelViewSet):
    """shopping list view"""
    queryset = ShoppingList.active_lists.active()
    serializer_class = ShoppingListSerializer

    def create(self, request, *args, **kwargs):
        """Handle new shopping list submission"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        shopping_list = serializer.save()

        # Set inital status
        shopping_list.status = 'submitted'
        shopping_list.save()

        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                **serializer.data,
                'message': 'Your shopping list has been submitted. We will process and provide a quote soon.'
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )
    
    @action(detail=True, methods=['get'])
    def status(self, request, pk=None):
        """Check status of shopping list and its quote"""
        shopping_list = self.get_object()

        response_data = {
            'status': shopping_list.status,
            'items_total': shopping_list.items.count(),
            'items_priced': shopping_list.items.filter(price_added=True).count(),
            'last_update': shopping_list.updated_at,
            'customer_email': shopping_list.customer_email,
            'customer_phone': shopping_list.customer_phone,
            'delivery_address': shopping_list.delivery_address,
            'special_instructions': shopping_list.special_instructions,
        }

        items_data = []
        for item in shopping_list.items.all():
            item_data = {
                'name': item.name,
                'quantity': item.quantity,
                'description': item.description,
                'notes': item.notes,
                'price': item.actual_price or 0
            }
            items_data.append(item_data)
        
        response_data['items'] = items_data

        # Include quote if available
        if hasattr(shopping_list, 'quote'):
            quote_serializer = QuoteSerializer(shopping_list.quote)
            response_data['quote'] = quote_serializer.data

        return Response(response_data)
    
    @action(detail=True, methods=['post'])
    def accept_quote(self, request, pk=None):
        """Customer accepts the quote"""
        shopping_list = self.get_object()

        if not hasattr(shopping_list, 'quote'):
            return Response(
                {"error": "No quote available for this list"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if shopping_list.quote.expires_at < timezone.now():
            return Response(
                {"error": "Quote has expired. Please request a new quote"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        shopping_list.status = 'accepted'
        shopping_list.save()

        return Response({
            "message": "Wuote accepted successfully",
            "status": shopping_list.status
        })
    
    @action(detail=True, methods=['post'])
    def decline_quote(self, request, pk=None):
        """Customer declines the quote"""
        shopping_list = self.get_object()

        if not hasattr(shopping_list, 'quote'):
            return Response(
                {"error": "No quote available for this list"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        shopping_list.status = 'declined'
        shopping_list.save()
        
        return Response({
            "message": "Quote declined",
            "status": shopping_list.status
        })
    
    def get_queryset(self):
        """Filter shopping list based on email if provided"""
        queryset = ShoppingList.objects.all()
        email = self.request.query_params.get('email', None)
        if email is not None:
            queryset = queryset.filter(customer_email=email())
        return queryset.order_by('-created_at')
    
    @action(detail=True, methods=['post'])
    def send_confirmation(self, request, pk=None):
        """Sends order confirmation email to the customer"""
        shopping_list = self.get_object()
        quote = shopping_list.quote

        if not quote:
            return Response(
                {"error": "No quote found for this order"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        context = {
            'order_number': str(shopping_list.id),
            'customer_name': shopping_list.customer_email.split('@')[0],
            'items': shopping_list.items.all(),
            'quote': quote,
            'delivery_address': shopping_list.delivery_address,
            'special_instructions': shopping_list.special_instructions,
            'customer_phone': shopping_list.customer_phone,
            'customer_email': shopping_list.customer_email,
            'created_at': shopping_list.created_at,
        }

        try:
            email_html = render_to_string('emails/order_confirmation.html', context)
            email_text = render_to_string('emails/order_confirmation.txt', context)

            send_mail(
                subject=f'Downtown Shoppers - Order Confirmation #{shopping_list.id}',
                message=email_text,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[shopping_list.customer_email],
                html_message=email_html,
                fail_silently=False,
            )

            return Response({
                'message': 'Order confirmation email sent successfully'
            })
        except Exception as e:
            return Response(
                {'error': f'Failed to send confirmation email: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )