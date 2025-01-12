"""
URL configuration for core project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.shortcuts import redirect
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView
)

def redirect_to_api_docs(request):
    return redirect('swagger-ui')

def get_urls_by_domain(request):
    host = request.get_host()
    
    if host.startswith('admin.'):
        # Admin domain URLs
        return [
            path('', include('dashboard.urls')),  # Dashboard at root
            path('admin/', admin.site.urls),      # Django admin still accessible
        ]
    else:
        # API domain URLs
        return [
            path('', redirect_to_api_docs),       # Root redirects to docs
            path('api/', include('shopping.urls')),
            path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
            path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
            path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
        ]

def urls_wrapper(request):
    return get_urls_by_domain(request)

urlpatterns = urls_wrapper
