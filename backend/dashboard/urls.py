from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

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
    path('quotes/<int:quote_id>/edit/', views.edit_quote, name='edit_quote'),
    path('quotes/<int:pk>/archive/', views.archive_quote, name='archive_quote'),
    path('quotes/<int:pk>/unarchive/', views.unarchive_quote, name='unarchive_quote'),
    path('password_reset/', auth_views.PasswordResetView.as_view(
        template_name='dashboard/password/password_reset.html',
        email_template_name='dashboard/password/password_reset_email.html',
        subject_template_name='dashboard/password/password_reset_subject.txt',
        success_url='/dashboard/password_reset/done/'
    ), name='password_reset'),
    
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(
        template_name='dashboard/password/password_reset_done.html'
    ), name='password_reset_done'),
    
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
        template_name='dashboard/password/password_reset_confirm.html',
        success_url='/dashboard/reset/done/'
    ), name='password_reset_confirm'),
    
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(
        template_name='dashboard/password/password_reset_complete.html'
    ), name='password_reset_complete'),
]