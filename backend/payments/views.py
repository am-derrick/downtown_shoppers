from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from shopping.models import Quote, ShoppingList
from .services import PesaPalService
from .models import Payment
import logging
from rest_framework.exceptions import APIException

logger = logging.getLogger(__name__)

class InitiatePaymentView(APIView):
    """class to initiate payment with PesaPal"""
    def post(self, request, list_id):
        try:
            # Log incoming request data
            logger.info(f"Initiating payment for list_id: {list_id}")
            logger.info(f"Request data: {request.data}")
            
            shopping_list = get_object_or_404(ShoppingList, id=list_id)
            logger.info(f"Found shopping list: {shopping_list.id}")
            
            quote = get_object_or_404(Quote, shopping_list=shopping_list)
            logger.info(f"Found quote: {quote.id} with total: {quote.total}")
            
            payment_method = request.data.get('payment_method')
            if not payment_method:
                return Response(
                    {"error": "Payment method is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            pesapal_service = PesaPalService()
            payment_response = pesapal_service.create_payment_request(
                quote=quote,
                shopping_list=shopping_list,
                payment_method=payment_method
            )
            
            logger.info(f"PesaPal payment response: {payment_response}")

            # Verify required fields exist in payment_response
            if not payment_response.get('order_tracking_id'):
                logger.error(f"Missing order_tracking_id in response: {payment_response}")
                raise APIException("Missing order tracking ID from payment provider")

            if not payment_response.get('merchant_reference'):
                logger.error(f"Missing merchant_reference in response: {payment_response}")
                raise APIException("Missing merchant reference from payment provider")

            
            # Create payment record - Fixed the field names and data access
            payment = Payment.objects.create(
                quote=quote,
                order_tracking_id=payment_response['order_tracking_id'],  # Fixed field name
                merchant_reference=payment_response['merchant_reference'],
                amount=quote.total,
                payment_method=payment_method  # payment_method is a string, not a dict
            )
            
            logger.info(f"Created payment record: {payment.id}")

            if not payment_response.get('redirect_url'):
                logger.error(f"Missing redirect_url in response: {payment_response}")
                raise APIException("Missing redirect URL from payment provider")
            
            return Response({
                'redirect_url': payment_response['redirect_url'],
                'order_tracking_id': payment_response['order_tracking_id']
            })
            
        except Exception as e:
            logger.error(f"Error in payment initiation: {str(e)}", exc_info=True)
            return Response(
                {"error": f"Payment initialization failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
             
    
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