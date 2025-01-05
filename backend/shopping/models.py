from django.db import models
from django.utils.text import slugify
import uuid

class ShoppingList(models.Model):
    """Class for the shopping list with list of
    items and customer details"""
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('quoted', 'Quoted'),
            ('confirmed', 'Confirmed'),
            ('processing', 'Processing'),
            ('completed', 'Completed'),
            ('cancelled', 'Cancelled')
        ],
        default='pending'
    )
    customer_email = models.EmailField() # For guest checkout
    customer_phone = models.CharField(max_length=15)
    delivery_address = models.TextField()
    special_instructions = models.TextField(blank=True)

    def __str__(self):
        return f"List {self.id} - {self.status}"

    class Meta:
        ordering = ['-created_at']

class ShoppingItem(models.Model):
    """class for a shopping item"""
    shopping_list = models.ForeignKey(
        ShoppingList,
        related_name='items',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    quantity = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='shopping_items/%d/%m/%Y',
        blank=True,
        null=True
    )
    estimated_price = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        null=True,
        blank=True
    )
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.quantity})"

class Quote(models.Model):
    """class for price quotation"""
    shoppping_list = models.OneToOneField(
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
        choice=[
            ('pending', 'Pending'),
            ('accepted', 'Accepted'),
            ('declined', 'Declined'),
            ('expired', 'Expired')
        ],
        default='pending'
    )

    def __str__(self):
        return f"Quote for List {self.shoppping_list.id}"