from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import CartProduct
from .serializers import CartSerializer, GetCartSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class ListCartProducts(ListAPIView):
    queryset = CartProduct.objects.all()
    serializer_class = GetCartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        querySet = CartProduct.objects.all()
        if user is not None:
            querySet = querySet.filter(user=user)
        return querySet


class CreateCartProduct(ListCreateAPIView):
    queryset = CartProduct.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]


class RetrieveUpdateDestroyCartProduct(RetrieveUpdateDestroyAPIView):
    queryset = CartProduct.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.query_params.get("user", None)
        querySet = CartProduct.objects.all()
        if user is not None:
            querySet = querySet.filter(user=user)
        return querySet
