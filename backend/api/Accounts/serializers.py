from rest_framework.serializers import ModelSerializer

from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "role", "verified", "image", "address", "phone"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"], email=validated_data["email"], password=validated_data["password"]
        )
        return user

    def get_image(self, obj):
        if obj.image:
            return f"http://localhost:8000{obj.image.url}"
        return None
