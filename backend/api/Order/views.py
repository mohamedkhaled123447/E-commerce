from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Order
from .serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class ListOrders(ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        querySet = Order.objects.all()
        if user is not None:
            querySet = querySet.filter(user=user)
        return querySet


class CreateOrder(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


class RetrieveUpdateDestroyOrder(RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.query_params.get("user", None)
        querySet = Order.objects.all()
        if user is not None:
            querySet = querySet.filter(user=user)
        return querySet
