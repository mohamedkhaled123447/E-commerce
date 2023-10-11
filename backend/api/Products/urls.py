from django.urls import path
from .views import CreateProduct, RetrieveUpdateDestroyProduct, AllProducts

urlpatterns = [
    path("", AllProducts.as_view()),
    path("create", CreateProduct.as_view()),
    path("<int:pk>/", RetrieveUpdateDestroyProduct.as_view()),
]
