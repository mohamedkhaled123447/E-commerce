from .views import CreateCartProduct, RetrieveUpdateDestroyCartProduct,ListCartProducts
from django.urls import path

urlpatterns = [
    path("create/", CreateCartProduct.as_view()),
    path("<int:pk>/", RetrieveUpdateDestroyCartProduct.as_view()),
    path("", ListCartProducts.as_view()),
]
