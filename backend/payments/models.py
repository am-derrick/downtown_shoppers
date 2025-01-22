from django.db import models
from shopping.models import Quote

class Payment(models.Model):
    """
    Payment model handling both online (PesaPal) and Cash on Delivery payments.
    Tracks payment status, method, and transaction details throughout the payment lifecycle.
    """
    PAYMENT_STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
        ('CANCELLED', 'Cancelled'),
    ]

    PAYMENT_PROVIDER_CHOICES = [
        ('cod', 'Cash on Delivery'),
        ('pesapal', 'PesaPal'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('cod', 'Cash on Delivery'),
        ('mtn', 'MTN Mobile Money'),
        ('airtel', 'Airtel Money'),
        ('card', 'Credit/Debit Card'),
    ]

    # Core payment information
    quote = models.ForeignKey('shopping.Quote', on_delete=models.PROTECT)
    amount = models.DecimalField(max_digits=10, decimal_places=0)
    currency = models.CharField(max_length=3, default='UGX')
    
    # Payment method tracking
    provider = models.CharField(
        max_length=20, 
        choices=PAYMENT_PROVIDER_CHOICES,
        default='pesapal',
        help_text="The payment service provider handling this transaction"
    )
    payment_method = models.CharField(
        max_length=50,
        choices=PAYMENT_METHOD_CHOICES,
        help_text="The specific payment method used by the customer"
    )
    
    # Transaction identifiers
    order_tracking_id = models.CharField(
        max_length=100, 
        unique=True,
        null=True,  # Allow null for COD payments
        blank=True,
        help_text="PesaPal's order tracking ID for online payments"
    )
    merchant_reference = models.CharField(
        max_length=100, 
        unique=True,
        help_text="Our unique reference for this payment"
    )
    
    # Status tracking
    status = models.CharField(
        max_length=20, 
        choices=PAYMENT_STATUS_CHOICES, 
        default='PENDING'
    )
    status_description = models.TextField(
        null=True,
        blank=True,
        help_text="Detailed status information from payment provider"
    )

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When the payment was successfully completed"
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'

    def __str__(self):
        return f"Payment {self.merchant_reference} - {self.status}"

    @property
    def is_online_payment(self):
        """Check if this is an online payment via PesaPal"""
        return self.provider == 'pesapal'

    @property
    def is_cod_payment(self):
        """Check if this is a Cash on Delivery payment"""
        return self.provider == 'cod'

    def mark_as_completed(self):
        """Mark payment as completed and record completion time"""
        from django.utils import timezone
        self.status = 'COMPLETED'
        self.completed_at = timezone.now()
        self.save()