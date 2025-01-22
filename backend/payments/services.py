import uuid
import requests
from django.conf import settings
from .pesapal_config import PesaPalConfig
from rest_framework.exceptions import APIException
import logging

logger = logging.getLogger(__name__)

class PesaPalService:
    def __init__(self):
        self.consumer_key = settings.PESAPAL_CONSUMER_KEY
        self.consumer_secret = settings.PESAPAL_CONSUMER_SECRET

    def get_auth_token(self):
        """Authenticates with PesaPal to get a bearer token."""
        try:
            auth_data = {
                "consumer_key": settings.PESAPAL_CONSUMER_KEY,
                "consumer_secret": settings.PESAPAL_CONSUMER_SECRET
            }

            response = requests.post(
                PesaPalConfig.get_auth_url(),
                headers={
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                json=auth_data,
                timeout=30
            )

            response_data = response.json()
            token = response_data.get("token")
            
            if not token:
                raise APIException("Authentication failed - no token received")
                
            return token
                
        except requests.exceptions.RequestException as e:
            raise APIException(f"PesaPal authentication failed: {str(e)}")
      
    def create_payment_request(self, shopping_list, quote, payment_method):
        """Creates a payment request with PesaPal."""
        try:
            token = self.get_auth_token()

            merchant_reference = str(uuid.uuid4())
            
            payment_request = {
                "id": merchant_reference,
                "currency": "UGX",
                "amount": str(quote.total),
                "description": f"Payment for order {shopping_list.id}",
                "callback_url": f"{settings.FRONTEND_URL}/payment/callback",
                "notification_id": settings.PESAPAL_IPN_ID,
                "cancellation_url": f"{settings.FRONTEND_URL}/payment/cancel",
                "billing_address": {
                    "email_address": shopping_list.customer_email,
                    "phone_number": shopping_list.customer_phone,
                    "country_code": "UG",
                    "first_name": shopping_list.customer_email.split('@')[0],
                    "last_name": "",
                    "line_1": shopping_list.delivery_address,
                    "city": "Kampala",
                }
            }

            if payment_method:
                payment_request["payment_method"] = payment_method
            
            response = requests.post(
                PesaPalConfig.get_order_url(),
                headers={
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {token}"
                },
                json=payment_request,
                timeout=30
            )

            response_data = response.json()
                
            if response_data.get('error'):
                error_info = response_data['error']
                raise APIException(
                    f"Payment request failed: {error_info.get('message', 'Unknown error')}"
                )
                
            return {
                'redirect_url': response_data.get('redirect_url'),
                'order_tracking_id': response_data.get('order_tracking_id'),
                'merchant_reference': merchant_reference
            }
            
        except Exception as e:
            raise APIException(f"Payment request failed: {str(e)}")
    
    def verify_payment(self, order_tracking_id):
        """Verifies payment status with PesaPal."""
        token = self.get_auth_token()

        try:
            response = requests.get(
                f"{PesaPalConfig.get_status_url()}?orderTrackingId={order_tracking_id}",
                headers={
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {token}"
                }
            )
            return response.json()
        except Exception as e:
            raise APIException(f"Payment verification failed: {str(e)}")
