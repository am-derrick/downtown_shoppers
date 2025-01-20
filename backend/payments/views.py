from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from shopping.models import ShoppingList
from .services import PesaPalService
from .models import Payment

class InitiatePaymentView(APIView):
    """class to initiate payment with PesaPal"""
    def post(self, request, list_id):
        shopping_list = get_object_or_404(ShoppingList, id=list_id)
        payment_method = request.data.get('payment_method')

        pesapal_service = PesaPalService()
        payment_response = pesapal_service.create_payment_request(shopping_list, payment_method)

        # Create payment record
        Payment.objects.create(
            shopping_list=shopping_list,
            order_tracking_is=payment_method['order_tracking_id'],
            merchant_reference=payment_response['merchant_reference'],
            amount=shopping_list.total_amount,
            payment_method=payment_method
        )

        return Response({
            'redirect_url': payment_response['redirect_url'],
            'order_tracking_id': payment_response['order_tracking_id']
        })
    
class PaymentCallbackView(APIView):
    def get(self, request):
        order_tracking_id = request.query_params.get('OrderTrackingId')
        merchant_reference = request.query_params.get('MerchantReference')

        payment = get_object_or_404(Payment, order_tracking_id=order_tracking_id)

        pesapal_service = PesaPalService()
        payment_status = pesapal_service.verify_payment(order_tracking_id)

        payment.status= payment_status['payment_status_description']
        payment.save()

        # Redirect to frontend with status
        return Response({
            'status': payment_status['payment_status_description'],
            'shopping_list_id': payment.shopping_list.id
        })
    
class PaymentIPNView(APIView):
    def post(self, request):
        # Handle server-to-server notifications from PesaPal
        order_tracking_id = request.data.get('OrderTrackingId')
        payment = get_object_or_404(Payment, order_tracking_id=order_tracking_id)

        pesapal_service = PesaPalService()
        payment_status = pesapal_service.verify_payment(order_tracking_id)

        payment.status= payment_status['payment_status_description']
        payment.save()

        return Response(status=status.HTTP_200_OK)