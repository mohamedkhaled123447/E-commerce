from rest_framework.serializers import ModelSerializer
from .models import Product
from django.db.models.fields.files import ImageFieldFile


class ProductsSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
