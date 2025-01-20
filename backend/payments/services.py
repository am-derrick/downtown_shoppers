import uuid
import requests
from django.conf import settings
from .pesapal_config import PesaPalConfig
from rest_framework.exceptions import APIException

class PesaPalService:
    def __init__(self):
        self.consumer_key = settings.PESAPAL_CONSUMER_KEY
        self.consumer_secret = settings.PESAPAL_CONSUMER_SECRET

    def get_auth_token(self):
        try:
            response = requests.post(
                PesaPalConfig.get_auth_url(),
                headers={
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                json={
                    "consumer_key": self.consumer_key,
                    "consumer_secret": self.consumer_key
                }
            )
            response.raise_for_status()
            return response.json().get("token")
        except requests.exceptions.RequestException as e:
            raise APIException(f"PesaPal authentication failes: {str(e)}")
        
    def create_payment_request(self, shopping_list, payment_method):
        token = self.get_auth_token()

        callback_url = f"{settings.FRONTEND_URL}/paymetn/callback"
        ipn_url = f"{settings.BACKEND_URL}/api/payments/ipn"  # ipn - instant payment notification

        # Extract name from email for a basic identification
        default_name = shopping_list.customer_email.split('@')[0]

        payment_request = {
            "id": str(uuid.uuid4()),
            "currency": "UGX",
            "amount": float(shopping_list.total_amount),
            "description": f"Payment for order {shopping_list.id}",
            "callback_url": callback_url,
            "ipn_url": ipn_url,
            "notification_id": str(shopping_list.id),
            "payment_method": payment_method,
            "billing_address": {
                "email_address": shopping_list.customer_email,
                "phone_number": shopping_list.customer_phone,
                "country_code": "UG",
                "first_name": default_name,
                "middle_name": "",
                "last_name": "",
                "line_1": shopping_list.delivery_address,
                "line_2": "",
                "city": "",
                "state": "",
                "postal_code": "",
                "zip_code": ""
            }
        }

        try:
            response = requests.post(
                PesaPalConfig.get_order_url(),
                headers={
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {token}"
                },
                json=payment_request
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise APIException(f"Failed to create payment request: {str(e)}")
        
    def verify_payment(self, order_tracking_id):
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
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            raise APIException(f"Payment verification failed: {str(e)}")