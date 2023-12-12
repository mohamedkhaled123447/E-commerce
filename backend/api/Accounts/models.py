from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    address = models.CharField(max_length=100, default="address")
    order_history = models.JSONField(default=list, blank=True)
    ROLES = [
        ("customer", "Customer"),
        ("admin", "Admin"),
        ("seller", "Seller"),
    ]
    role = models.CharField(max_length=10, choices=ROLES, default="customer")
    verified = models.BooleanField(default=False)
    image = models.ImageField(upload_to="images/accounts/", blank=True, null=True)
    phone = models.CharField(max_length=20, default="")
