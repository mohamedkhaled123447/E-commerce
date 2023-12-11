from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver
import os


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


@receiver(pre_delete, sender=User)
def delete_product_image(sender, instance, **kwargs):
    if instance.image:
        image_path = instance.image.path
        if os.path.exists(image_path):
            os.remove(image_path)


pre_delete.connect(delete_product_image, sender=User)
