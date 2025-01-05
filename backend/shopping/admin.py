from django.contrib import admin
from .models import ShoppingList, ShoppingItem, Quote, ItemPrice

class ShoppingItemInLine(admin.TabularInline):
    model = ShoppingItem
    extra = 0
    fields = ['name', 'quantity', 'actual_price', 'price_added', 'notes']
    readonly_fields = ['name', 'quantity']

@admin.register(ShoppingList)
class ShoppingListAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'created_at', 'status', 'customer_email',
        'items_priced', 'total_items'
    ]
    list_filter = ['status', 'created_at']
    search_fields = ['customer_email', 'customer_phone', 'id']
    inline = [ShoppingItemInLine]
    readonly_fields = ['created_at', 'updated_at']

    def items_priced(self, obj):
        return obj.items.filter(price_added=True).count()
    items_priced.short_description = 'Prices Items'

    def total_items(self, obj):
        return obj.items.count()
    total_items.short_description = 'Total Items'

@admin.register(ShoppingItem)
class ShoppingItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'quantity', 'actual_price', 'price_added', 'shopping_list']
    list_editable = ['actual_price', 'price_added']
    list_filter = ['price_added']
    search_fields = ['name']

@admin.register(ItemPrice)
class ItemPriceAdmin(admin.ModelAdmin):
    list_display = ['name', 'current_price', 'last_updated']
    list_editable = ['current_price']
    search_fields = ['name']
    ordering = ['name']
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion to maintain price history
        return False

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ['shopping_list', 'created_at', 'total', 'status']
    list_filter = ['status', 'created_at']
    readonly_fields = ['created_at']

    def has_add_permission(self, request):
        # Qoutes are only created through the application logic
        return False