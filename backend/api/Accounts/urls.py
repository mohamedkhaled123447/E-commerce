from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path("", views.GetAllUser.as_view(), name="home"),
    path("<int:pk>/", views.GetUser.as_view(), name="user"),
    path("register/", views.RegisterUser.as_view(), name="register"),
    path("api/token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("confirmemail/", views.ConfirmEmail.as_view(), name="confirm_email"),
    path("sendemail/", views.SendVerificationEmail.as_view(), name="send_email"),
    path("update_profile_image/", views.UpdateProfileImage.as_view(), name="update_profile_image"),
]
