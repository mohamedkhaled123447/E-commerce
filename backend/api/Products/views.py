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


class Create(APIView):
    def post(self, request):
        print(request.data)
        return Response("a7a")
