import json
import os

current_item_id = 18

# Read mock data
with open('shopping/fixtures/mock_data.json', 'r') as f:
    mock_data = json.load(f)

# Prepare fixtures
shopping_lists_fixture = []
shopping_items_fixture = []

# Process each shopping list
for list_data in mock_data:
    # Transform shopping list data
    shopping_list = {
        "model": "shopping.shoppinglist",
        "pk": list_data['id'],
        "fields": {
            "created_at": list_data['created_at'],
            "updated_at": list_data['created_at'],
            "status": list_data['status'],
            "customer_email": list_data['customer_email'],
            "customer_phone": list_data['customer_phone'],
            "delivery_address": list_data['delivery_address'],
            "special_instructions": ""
        }
    }
    shopping_lists_fixture.append(shopping_list)
    
    # Process items for this list
    for item in list_data['items']:
        shopping_item = {
            "model": "shopping.shoppingitem",
            "pk": current_item_id,
            "fields": {
                "shopping_list": list_data['id'],
                "name": item['name'],
                "quantity": "1 piece",
                "description": "",
                "image": None,
                "price_added": False,
                "actual_price": None,
                "notes": ""
            }
        }
        shopping_items_fixture.append(shopping_item)
        current_item_id += 1

# Create fixtures directory if it doesn't exist
if not os.path.exists('shopping/fixtures'):
    os.makedirs('shopping/fixtures')  # Note: makedirs not makedir

# Write the fixtures to files
with open('shopping/fixtures/mock_shopping_lists.json', 'w') as f:
    json.dump(shopping_lists_fixture, f, indent=2)

with open('shopping/fixtures/mock_shopping_items.json', 'w') as f:
    json.dump(shopping_items_fixture, f, indent=2)

print(f"Created fixtures with {len(shopping_lists_fixture)} lists and {len(shopping_items_fixture)} items.")
print(f"Last item ID used: {current_item_id - 1}")