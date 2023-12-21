from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
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
class Home(APIView):
    #permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class RegisterUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *arg, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


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
