import uuid
import requests
from django.conf import settings
from .pesapal_config import PesaPalConfig
from rest_framework.exceptions import APIException
import logging
import json

logger = logging.getLogger(__name__)

class PesaPalService:
    def __init__(self):
        self.consumer_key = settings.PESAPAL_CONSUMER_KEY
        self.consumer_secret = settings.PESAPAL_CONSUMER_SECRET

    def get_auth_token(self):
        try:
            auth_data = {
                "consumer_key": settings.PESAPAL_CONSUMER_KEY,
                "consumer_secret": settings.PESAPAL_CONSUMER_SECRET
            }

            logger.info(f"Attempting authentication with URL: {PesaPalConfig.get_auth_url()}")
            logger.info("Making auth request to PesaPal...")

            logger.info("Auth request payload structure (keys stripped):")
            logger.info({
                key: f"{'*' * 8}{value[-4:]}" if value else None 
                for key, value in auth_data.items()
            })

            response = requests.post(
                PesaPalConfig.get_auth_url(),
                headers={
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                json=auth_data,
                timeout=30
            )

            logger.info(f"Auth Response Status Code: {response.status_code}")
            logger.info(f"Auth Response Headers: {dict(response.headers)}")
            logger.info(f"Auth Response Content: {response.text}")

            try:
                response_data = response.json()
                logger.info(f"Parsed Response Data: {response_data}")
                
                token = response_data.get("token")
                if not token:
                    logger.error(f"No token in response. Full response: {response_data}")
                    raise APIException("No token in PesaPal response")
                    
                return token
                
            except ValueError as e:
                logger.error(f"Failed to parse JSON response: {str(e)}")
                logger.error(f"Raw response content: {response.text}")
                raise APIException("Invalid JSON response from PesaPal")
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Request to PesaPal failed: {str(e)}")
            if hasattr(e, 'response'):
                logger.error(f"Response Status: {e.response.status_code}")
                logger.error(f"Response Content: {e.response.text}")
            raise APIException(f"PesaPal authentication failed: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected error during authentication: {str(e)}")
            raise APIException(f"Authentication error: {str(e)}")
        
    def verify_ipn_id(self, token):
        """Verify if IPN ID is valid with PesaPal"""
        try:
            response = requests.get(
                f"{PesaPalConfig.get_base_url()}/api/URLSetup/GetIpnList",
                headers={
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {token}"
                }
            )
            response.raise_for_status()  # Raise error for bad status codes
            
            # Log the complete raw response
            logger.info(f"Raw IPN List Response: {response.text}")
            
            ipn_data = response.json()
            # Check if our IPN ID exists in the list
            current_ipn = settings.PESAPAL_IPN_ID
            ipn_exists = any(
                ipn.get('ipn_id') == current_ipn and 
                ipn.get('ipn_status') == 1 and  # Check if active
                str(ipn.get('status')) == '1'    # Check overall status
                for ipn in ipn_data
            )
            
            if not ipn_exists:
                logger.error(f"IPN ID {current_ipn} not found in active IPNs or is inactive")
                return False
                
            logger.info(f"Current IPN ID: {current_ipn}")
            logger.info(f"IPN exists and is active in PesaPal's system: {ipn_exists}")
            
            return ipn_exists
        except Exception as e:
            logger.error(f"Error verifying IPN ID: {str(e)}")
            return False
        
    def verify_ipn_directly(self, token):
        """Directly verify IPN with PesaPal"""
        try:
            response = requests.get(
                f"{PesaPalConfig.get_base_url()}/api/URLSetup/GetIpnList",
                headers={
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {token}"
                }
            )
            
            ipn_list = response.json()
            current_ipn = settings.PESAPAL_IPN_ID.strip()  # Remove any whitespace
            
            # Find our exact IPN
            matching_ipn = next((ipn for ipn in ipn_list if ipn.get('ipn_id') == current_ipn), None)
            
            if matching_ipn:
                logger.info(f"Found exact matching IPN: {matching_ipn}")
                # Log all fields from matching IPN for debugging
                for key, value in matching_ipn.items():
                    logger.info(f"IPN field {key}: {value}")
                return matching_ipn
            else:
                logger.error(f"IPN ID {current_ipn} not found in PesaPal's list")
                return None

        except Exception as e:
            logger.error(f"Error in direct IPN verification: {str(e)}")
            return None

        
    def create_payment_request(self, shopping_list, quote, payment_method):
        try:
            token = self.get_auth_token()

            matching_ipn = self.verify_ipn_directly(token)
            if not matching_ipn:
                raise APIException("IPN verification failed - IPN not found or inactive")
            
                
            merchant_reference = str(uuid.uuid4())
            
            payment_request = {
                "id": str(uuid.uuid4()),
                "currency": "UGX",
                "amount": str(quote.total),
                "description": f"Payment for order {shopping_list.id}",
                "callback_url": f"{settings.FRONTEND_URL}/payment/callback",
                "notification_type": "POST",
                "ipn_notification_type": 1,
                "ipn_id": settings.PESAPAL_IPN_ID,
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

            
            logger.info(f"IPN Details from verification: {matching_ipn}")
            logger.info(f"Payment request to PesaPal: {payment_request}")
            logger.info(f"Request URL: {PesaPalConfig.get_order_url()}")
            
            response = requests.post(
                PesaPalConfig.get_order_url(),
                headers={
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {token}"
                },
                json=payment_request,
                timeout=30  # Add explicit timeout
            )

            logger.info(f"Raw Response: {response.text}")

            try:
                response_data = response.json()
                logger.info(f"Full PesaPal Response: {response_data}")
                
                if 'error' in response_data:
                    error_info = response_data.get('error', {})
                    raise APIException(
                        f"PesaPal Error: Type: {error_info.get('error_type')}, "
                        f"Code: {error_info.get('code')}, "
                        f"Message: {error_info.get('message')}"
                    )
                    
                return {
                    'redirect_url': response_data.get('redirect_url'),
                    'order_tracking_id': response_data.get('order_tracking_id'),
                    'merchant_reference': merchant_reference
                }
                
            except json.JSONDecodeError:
                logger.error(f"Failed to parse response as JSON: {response.text}")
                raise APIException("Invalid response from payment provider")
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Request to PesaPal failed: {str(e)}")
            raise APIException("Failed to communicate with payment provider")
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse PesaPal response: {str(e)}")
            raise APIException("Invalid response from payment provider")
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise APIException(str(e))
    
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