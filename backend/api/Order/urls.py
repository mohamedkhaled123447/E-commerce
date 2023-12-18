from .views import CreateOrder, RetrieveUpdateDestroyOrder, ListOrders, createCheckoutSession, my_webhook_view
from django.urls import path

urlpatterns = [
    path("create/", CreateOrder.as_view()),
    path("<int:pk>/", RetrieveUpdateDestroyOrder.as_view()),
    path("", ListOrders.as_view()),
    path("create-checkout-session/", createCheckoutSession.as_view()),
    path("webhook/", my_webhook_view),
]
