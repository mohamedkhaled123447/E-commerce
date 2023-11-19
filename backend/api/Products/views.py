from django.shortcuts import render
from .models import Product
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.views import APIView
from .serializers import ProductsSerializer
from rest_framework.response import Response

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

    def get_queryset(self):
        name = self.request.query_params.get("name", None)
        price = self.request.query_params.get("price", None)
        categroy = self.request.query_params.get("categroy", None)
        querySet = Product.objects.all()
        if name is not None:
            querySet = querySet.filter(name__startswith=name)
        if price is not None:
            querySet = querySet.filter(price__gte=price)
        if categroy is not None:
            querySet = querySet.filter(categroy=categroy)
        return querySet

