# Downtown Shoppers

[![Python Version](https://img.shields.io/badge/python-3.11-brightgreen.svg)](https://python.org)
[![Django Version](https://img.shields.io/badge/django-5.1-brightgreen.svg)](https://www.djangoproject.com/download/)
[![Bootstrap Version](https://img.shields.io/badge/bootstrap-5.3-purple.svg)](https://getbootstrap.com/docs/5.3/)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Downtown Shoppers](https://github.com/am-derrick/downtown_shoppers/blob/prod/frontend/src/assets/images/Downtown_Shoppers_logo.png)

An e-commerce platform that streamlines the shopping experience by allowing users to submit shopping lists and receive quotes before completing their orders.

## 🌟 Live Demo

- Frontend: [https://www.downtown-shopping.org](https://www.downtown-shopping.org)
- Admin Dashboard: [https://app.downtown-shopping.org/dashboard](https://app.downtown-shopping.org/dashboard)
- API: [https://app.downtown-shopping.org/api](https://app.downtown-shopping.org/api)
- API Documentation:
  - Swagger UI: [https://app.downtown-shopping.org/api/docs](https://app.downtown-shopping.org/api/docs)
  - ReDoc: [https://app.downtown-shopping.org/api/redoc](https://app.downtown-shopping.org/api/redoc)

## 🚀 Features

- Shopping list submission with detailed item specifications
- Quote generation and management
- Email notifications
- Order tracking with status updates
- Admin dashboard for order management
- RESTful API built with Django REST Framework
- Modern React frontend with Tailwind CSS

## 🛠 Tech Stack

### Backend

- Django 5.1.4
- Django REST Framework 3.15.2
- PostgreSQL (via psycopg2-binary)
- drf-spectacular for API documentation
- django-cors-headers for CORS support
- Pillow for image handling
- Gunicorn as WSGI server

### Frontend

- React 18.2.0
- Vite as build tool
- TailwindCSS for styling
- Framer Motion for animations
- Axios for API requests
- React Router DOM for routing
- Radix UI components
- Heroicons and Lucide React for icons

## 📁 Project Structure

```
downtown_shoppers/
├── backend/
│   ├── core/           # Main Django project
│   ├── shopping/       # API application
│   ├── dashboard/      # Admin dashboard application
│   ├── media/          # Media files
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/
    ├── src/             # React source code
    ├── public/          # Static files
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## 🚦 API Endpoints

The API supports the following main operations:

- `GET /api/shopping-lists/`: List all shopping lists
- `POST /api/shopping-lists/`: Create a new shopping list
- `GET /api/shopping-lists/{id}/`: Retrieve a specific shopping list
- `PUT /api/shopping-lists/{id}/`: Update a shopping list
- `DELETE /api/shopping-lists/{id}/`: Delete a shopping list
- `POST /api/shopping-lists/{id}/accept_quote/`: Accept a quote
- `POST /api/shopping-lists/{id}/decline_quote/`: Decline a quote
- `GET /api/shopping-lists/{id}/status/`: Check list status

## 💻 Development Setup

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd downtown_shoppers/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd downtown_shoppers/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

- Frontend is deployed on Vercel
- Backend is hosted on Digital Ocean
- Make sure to set appropriate environment variables for production deployment

## 🔄 Order Status Flow

Shopping lists follow this status progression:

1. `submitted`: Initial list submission
2. `processing`: Admin review in progress
3. `quoted`: Price quote generated
4. `accepted`: Customer accepted quote
5. `declined`: Customer declined quote
6. `completed`: Order fulfilled

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

[ampire90@gmail.com](mailto:ampire90@gmail.com)