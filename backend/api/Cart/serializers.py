from rest_framework import serializers
from .models import CartProduct


class GetCartSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    def get_product(self, obj):
        product = {
            "id": obj.product.id,
            "name": obj.product.name,
            "price": obj.product.price,
            "image": f"http://localhost:8000{obj.product.image.url}",
        }
        return product

    class Meta:
        model = CartProduct
        fields = "__all__"


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartProduct
        fields = "__all__"
