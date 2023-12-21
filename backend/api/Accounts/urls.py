from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path("", views.Home.as_view(), name="home"),
    path("register/", views.RegisterUser.as_view(), name="register"),
    path("api/token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("confirmemail/", views.ConfirmEmail.as_view(), name="confirm_email"),
    path("sendemail/", views.SendVerificationEmail.as_view(), name="send_email"),
]
