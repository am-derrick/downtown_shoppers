# downtown_shoppers

1. First Phase (Current Progress):
- ✅ Landing page
- ✅ Basic shopping list creation interface
- ✅ Basic routing setup

2. Second Phase (Backend Focus):
- Django User Authentication & Admin Setup
   - ✅ User model customization
   - Admin dashboard basics
   - Authentication endpoints
- Shopping List Backend
   - ✅ Models for shopping lists and items
   - ✅ API endpoints for list creation/management
   - Image storage setup
- Price Generation System
   - ❌ Price calculation logic
   - ✅ Quote generation

3. Third Phase (Frontend-Backend Integration):
- Connect shopping list creation to backend
- Implement image upload functionality
- Add real-time price calculations
- Integrate user authentication

4. Fourth Phase:
- Build quote preview with real data
- Implement order confirmation flow
- Enhance admin dashboard
- Add user profiles and history

🤔 Optional considerations before frontend integration:

- API rate limiting to prevent abuse
- Request logging for debugging
- Better error responses for image uploads
- System notifications (e.g., when new list is submitted)

For the Admin Dashboard:
- Use Django's built-in admin with customizations
- Enhance it gradually as needed

For User Authentication:
- Leverage Django's authentication system
- Use Django REST Framework for API endpoints
- Frontend just needs to handle forms and token storage

## List operations
- GET     /api/shopping-lists/ - List all shopping lists 
- POST    /api/shopping-lists/ - Create new shopping list
- GET     /api/shopping-lists/{id}/ - Get specific list
- PUT     /api/shopping-lists/{id}/ - Update list
- DELETE  /api/shopping-lists/{id}/ - Delete list

## Custom actions
- GET     /api/shopping-lists/{id}/status/ - Check list status
- POST    /api/shopping-lists/{id}/accept_quote/ - Accept quote
- POST    /api/shopping-lists/{id}/decline_quote/ - Decline quote

## Documentation
- [Swagger UI](http://127.0.0.1:8000/api/docs/)
- [ReDoc UI](http://localhost:8000/api/redoc/)
