from django.db.models.signals import pre_delete
from django.dispatch import receiver
import os
from .models import Product


@receiver(pre_delete, sender=Product)
def delete_product_image(sender, instance, **kwargs):
    if instance.image:
        image_path = instance.image.path
        if os.path.exists(image_path):
            os.remove(image_path)
