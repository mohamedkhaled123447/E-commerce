from django.db.models.signals import pre_delete, post_save
from django.dispatch import receiver
import os
from .models import User
from .tasks import SendEmail


@receiver(pre_delete, sender=User)
def delete_product_image(sender, instance, **kwargs):
    if instance.image:
        image_path = instance.image.path
        if os.path.exists(image_path):
            os.remove(image_path)


@receiver(post_save, sender=User)
def send_email(sender, instance, created, **kwargs):
    if created:
        SendEmail.delay(instance.id)
