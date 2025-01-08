from django.urls import path
from . import views

app_name = 'dashboard'

urlpatterns = [
    path('', views.dashboard_home, name='home'),
    path('login/', views.login_view, name='login'),
    path('lists/', views.shopping_list_view, name='lists'),
    path('lists/<uuid:pk>/', views.shopping_list_detail, name='list_detail'),
    path('quotes/', views.quote_list, name='quotes'),
    path('quotes/create/<uuid:list_id>/', views.create_quote, name='create_quote'),
]