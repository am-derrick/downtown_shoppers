from django.conf import settings

class PesaPalConfig:
    """class handling environment specific settings for pesapal"""
    @staticmethod
    def get_base_url():
        if settings.DEBUG:
            return "https://cybqa.pesapal.com/pesapalv3"
        return "https://pay.pesapal.com/v3"

    @staticmethod
    def get_auth_url():
        return f"{PesaPalConfig.get_base_url()}/api/Auth/RequestToken"
    
    @staticmethod
    def get_order_url():
        return f"{PesaPalConfig.get_base_url()}/api/Transactions/SubmitOrderRequest"
    
    @staticmethod
    def get_status_url():
        return f"{PesaPalConfig.get_base_url()}/api/Transactions/GetTransactionStatus"