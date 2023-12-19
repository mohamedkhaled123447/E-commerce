from rest_framework.serializers import ModelSerializer
from .models import Product, Rating
from django.db.models.fields.files import ImageFieldFile


class ProductsSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class RatingSerializer(ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"
