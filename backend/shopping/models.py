from django.db import models
from django.db.models import Q
import uuid
from django.core.validators import EmailValidator
from .validators import validate_ug_phone

class ShoppingList(models.Model):
    """Class for the shopping list with list of
    items and customer details"""
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('submitted', 'List Submitted'),    # User submits list
            ('processing', 'Admin Processing'), # Admin is working on pricing
            ('quoted', 'Quote Ready'),         # Prices added, quote sent to customer
            ('accepted', 'Quote Accepted'),    # Customer accepted the quote
            ('declined', 'Quote Declined'),    # Customer declined the quote
            ('completed', 'Order Completed')
        ],
        default='submitted'
    )
    customer_email = models.EmailField(
        validators=[EmailValidator]
    )
    customer_phone = models.CharField(
        max_length=15,
        validators=[validate_ug_phone]
    )
    delivery_address = models.TextField()
    special_instructions = models.TextField(blank=True)

    def __str__(self):
        return f"List {self.id} - {self.status}"

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['status']),
            models.Index(fields=['customer_email']),
        ]

class ShoppingItem(models.Model):
    """class for a shopping item"""
    shopping_list = models.ForeignKey(
        ShoppingList,
        related_name='items',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    quantity = models.CharField(
        max_length=100,
        help_text="Specify quantity (e.g., '2 kg', '3 pieces')"
        )
    description = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='shopping_items/%d/%m/%Y',
        blank=True,
        null=True
    )
    price_added = models.BooleanField(default=False)
    actual_price = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        null=True,
        blank=True,
        help_text="Price in UGX"
    )
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.quantity})"
    
    def suggest_price(self):
        """Suggest price based on existing db price entries"""
        similar_items = ItemPrice.objects.filter(
            Q(name__icontains=self.name) |
            Q(name__iexact=self.name)
        ).order_by('-last_updated')

        if similar_items.exists():
            return similar_items.first().current_price
        return None
    
class ItemPrice(models.Model):
    """class to keep track the prices of items and updates"""
    name = models.CharField(max_length=255)
    current_price = models.DecimalField(max_digits=10, decimal_places=0)
    last_updated = models.DateTimeField(auto_now=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} - {self.current_price}"
    
    class Meta:
        ordering = ['name']
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['-last_updated']),
        ]

class Quote(models.Model):
    """class for price quotation"""
    shopping_list = models.OneToOneField(
        ShoppingList,
        on_delete=models.CASCADE,
        related_name='quote'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=0)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=0)
    service_fee = models.DecimalField(max_digits=10, decimal_places=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('accepted', 'Accepted'),
            ('declined', 'Declined'),
            ('expired', 'Expired')
        ],
        default='pending'
    )

    def __str__(self):
        return f"Quote for List {self.shoppping_list.id}"
