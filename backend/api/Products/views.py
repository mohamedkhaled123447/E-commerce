from django.shortcuts import render
from .models import Product, Rating
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.views import APIView
from .serializers import ProductsSerializer, RatingSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

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


class CreateRating(ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        data = request.data
        rating = Rating.objects.filter(product=data["product"], user=data["user"])
        if rating.exists():
            rating = rating.first()
            rating.value = data["value"]
            rating.save()
            serializer = self.get_serializer(rating)
            return Response(serializer.data)
        else:
            return super().create(request, *args, **kwargs)


class RetrieveUpdateDestroyRating(RetrieveUpdateDestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class AllRatings(ListAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

    def get_queryset(self):
        product = self.request.query_params.get("product", None)
        querySet = Rating.objects.all()
        if product is not None:
            querySet = querySet.filter(product=product)
        return querySet
