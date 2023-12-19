from django.urls import path
from .views import CreateProduct, RetrieveUpdateDestroyProduct, AllProducts,CreateRating,RetrieveUpdateDestroyRating,AllRatings

urlpatterns = [
    path("", AllProducts.as_view()),
    path("create/", CreateProduct.as_view()),
    path("<int:pk>/", RetrieveUpdateDestroyProduct.as_view()),
    path("ratings/", AllRatings.as_view()),
    path("ratings/create/", CreateRating.as_view()),
    path("ratings/<int:pk>/", RetrieveUpdateDestroyRating.as_view()),
]
