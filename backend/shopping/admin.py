from django.contrib import admin
from .models import ShoppingList, ShoppingItem, Quote

class ShoppingItemInLine(admin.TabularInline):
    model = ShoppingItem
    extra = 0

@admin.register(ShoppingList)
class ShoppingListAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_at', 'status', 'customer_email', 'customer_phone']
    list_filter = ['status', 'created_at']
    search_fields = ['customer_email', 'customer_phone', 'id']
    inline = [ShoppingItemInLine]
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ['shopping_list', 'created_at', 'total', 'status']
    list_filter = ['status', 'created_at']
    readonly_fields = ['created_at']

    def has_add_permission(self, request):
        return False # Qoutes are only created through the application logic