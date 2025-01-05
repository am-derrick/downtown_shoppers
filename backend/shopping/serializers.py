from rest_framework import serializers
from .models import ShoppingList, ShoppingItem, Quote

class ShoppingItemSerializer(serializers.ModelSerializer):
    """shopping item serializer"""
    class Meta:
        model = ShoppingItem
        fields = [
            'id', 'name', 'quantity',
            'description', 'image', 'notes'
        ]

    def validate_image(self, value):
        """function to validate image size so it's 5MB limit max"""
        if value:
            if value.size > 5 * 1024 *1024:
                raise serializers.ValidationError("Image size cannot exceed 5MB")
            return value
        return value

class ShoppingListSerializer(serializers.ModelSerializer):
    """shopping list serializer"""
    items = ShoppingItemSerializer(many=True)

    class Meta:
        model = ShoppingList
        fields = [
            'id', 'create_at', 'status', 'customer_email',
            'customer_phone', 'delivery_address',
            'special_instructions', 'items'
        ]
        read_only_fields = ['created_at', 'status']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        shopping_list = ShoppingList.objects.create(**validated_data)

        for item_data in items_data:
            ShoppingItem.objects.create(shopping_list=shopping_list, **item_data)

        return shopping_list
    
class QuoteSerializer(serializers.ModelSerializer):
    """quote serializer class"""
    class Meta:
        model = Quote
        fields = [
            'id', 'created_at', 'expires_at', 'subtotal',
            'delivery_fee', 'service_fee', 'total', 'status'
        ]
        read_only_fields = ['created_at', 'expires_at', 'status']