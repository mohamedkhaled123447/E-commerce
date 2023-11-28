from .views import CreateOrder, RetrieveUpdateDestroyOrder
from django.urls import path

urlpatterns = [
    path("create/", CreateOrder.as_view()),
    path("<int:pk>/", RetrieveUpdateDestroyOrder.as_view()),
]
