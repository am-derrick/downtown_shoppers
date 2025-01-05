from django.utils import timezone
from datetime import timedelta
from .models import Quote

def generate_quote(shopping_list):
    """Generate a quote once admin has updated the prices"""
    # Only generate if all items are priced
    if not all(item.price_added for item in shopping_list.items.all()):
        return None
    
    # Calculate total from prices
    subtotal = sum(
        item.actual_price or 0
        for item in shopping_list.items.all()
    )

    # Calculate fees
    delivery_fee = 5000 # base delivery fee in UGX
    service_fee = subtotal * 0.1 # 10% service fee

    # Total
    total = subtotal + delivery_fee + service_fee

    # Create quote
    quote = Quote.objects.create(
        shopping_list=shopping_list,
        expires_at=timezone.now() + timedelta(hours=24),
        subtotal=subtotal,
        delivery_fee=delivery_fee,
        service_fee=service_fee,
        total=total
    )

    return quote