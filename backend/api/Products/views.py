from django.shortcuts import render
from .models import Product
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import ProductsSerializer

# Create your views here.


class CreateProduct(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer


class RetrieveUpdateDestroyProduct(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer


class AllProducts(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
