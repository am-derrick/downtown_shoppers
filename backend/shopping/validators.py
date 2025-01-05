import re
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator

def validate_ug_phone(phone_number):
    """
    Validate Ugandan phone numbers
    Accepts formats: +256XXXXXXXXX, 256XXXXXXXXX, 0XXXXXXXXX
    """
    # Remove any spaces or hyphens
    phone = re.sub(r'[\s-]', '', str(phone_number))
    
    # Regular expression for Ugandan numbers
    pattern = r'^(?:\+256|256|0)(7[0-8][0-9]|20|41)[0-9]{6}$'
    
    if not re.match(pattern, phone):
        raise ValidationError(
            'Enter a valid Ugandan phone number (e.g., +256700000000, 0700000000)'
        )
    
    return phone