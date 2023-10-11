from rest_framework.serializers import ModelSerializer
from .models import Product
from django.db.models.fields.files import ImageFieldFile


class ProductsSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

    def create(self, validated_data):
        product = Product.objects.create(
            name=validated_data["name"],
            description=validated_data["description"],
            price=validated_data["price"],
            stock_quantity=validated_data["stock_quantity"],
            category=validated_data["category"],
            seller=validated_data["seller"],
            image=validated_data["image"],
        )
        return product
