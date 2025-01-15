from django.urls import path
from . import views

app_name = 'dashboard'

urlpatterns = [
    path('', views.dashboard_home, name='home'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('lists/', views.shopping_list_view, name='lists'),
    path('lists/<uuid:pk>/', views.shopping_list_detail, name='list_detail'),
    path('lists/<uuid:pk>/archive/', views.archive_list, name='archive_list'),
    path('lists/<uuid:pk>/unarchive/', views.unarchive_list, name='unarchive_list'),
    path('quotes/', views.quote_list, name='quotes'),
    path('quotes/create/<uuid:list_id>/', views.create_quote, name='create_quote'),
    path('quotes/<int:pk>/archive/', views.archive_quote, name='archive_quote'),
    path('quotes/<int:pk>/unarchive/', views.unarchive_quote, name='unarchive_quote'),
]