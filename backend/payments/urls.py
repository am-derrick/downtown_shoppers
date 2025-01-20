from django.urls import path
from .views import InitiatePaymentView, PaymentCallbackView, PaymentIPNView

urlpatterns = [
    path('initiate/<str:list_id>/', InitiatePaymentView.as_view(), name='initiate-payment'),
    path('callback/', PaymentCallbackView.as_view(), name='payment-callback'),
    path('ipn/', PaymentIPNView.as_view(), name='payment-ipn'),
]