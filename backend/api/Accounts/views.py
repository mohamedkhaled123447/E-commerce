from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404
from django.core.files.storage import default_storage
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
import uuid
from .tasks import SendEmail


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["user"] = UserSerializer(user).data
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Create your views here.
class GetAllUser(ListAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RegisterUser(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GetUser(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class ConfirmEmail(APIView):
    def post(self, request, *args, **kwargs):
        user = User.objects.get(id=request.data["id"])
        if user.confirmation_code == request.data["code"]:
            user.verified = True
            user.save()
            return Response({"message": "Email confirmed"}, status=200)
        return Response({"message": "Email not confirmed"}, status=400)


class SendVerificationEmail(APIView):
    def post(self, request, *args, **kwargs):
        user = User.objects.get(id=request.data["id"])
        user.confirmation_code = uuid.uuid4()
        user.save()
        SendEmail.delay(user.id)
        return Response({"message": "Email sent"}, status=200)


class UpdateProfileImage(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        image_file = request.FILES.get("image")
        user_id = request.user.id
        user = get_object_or_404(User, id=user_id)
        old_image = user.image
        default_storage.delete(old_image.path)
        user.image.save(image_file.name, image_file)
        # Serialize the user object
        serializer = UserSerializer(user)
        # Return a success response with the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)
