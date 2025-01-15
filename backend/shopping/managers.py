from django.db import models
from django.utils import timezone
from datetime import timedelta

class ShoppingListManager(models.Manager):
    """Manager to handle active and inactive shopping lists"""
    def get_queryset(self):
        return super().get_queryset()

    def active(self):
        """Return only active lists (not soft-deleted and within 90 days)"""
        cutoff_date = timezone.now() - timedelta(days=90)
        return self.get_queryset().filter(
            is_active=True,
            created_at__gte=cutoff_date
        )

class QuoteManager(models.Manager):
    """Handles active or inactive quotes"""
    def get_queryset(self):
        return super().get_queryset()

    def active(self):
        """Return only active quotes (no soft-deleted within 90 days)"""
        cutoff_date = timezone.now() - timedelta(days=90)
        return self.get_queryset().filter(
            is_active=True,
            created_at__gte=cutoff_date
        )