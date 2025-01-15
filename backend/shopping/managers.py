from django.db import models
from django.utils import timezone
from datetime import timedelta

class ShoppingListmanager(models.Manager):
    """Manager to handle active and inaactive shopping lists"""
    def active(self):
        """Return only active lists (not soft-deleted and within 90 days)"""
        cutoff_date = timezone.now() - timedelta(days=90)
        return self.filter(
            is_active=True,
            created_at__gte=cutoff_date
        )
    
class Quotemanager(models.Manager):
    """Handles active or inactive quotes"""
    def active(self):
        """Return only active quotes (no soft-deleted within 90 days)"""
        cutoff_date = timezone.now() - timedelta(days=90)
        return self.filter(
            is_active=True,
            created_at__gte=cutoff_date
        )