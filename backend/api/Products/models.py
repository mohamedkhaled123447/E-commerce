from django.db import models
from Accounts.models import User
from django.db.models.signals import pre_delete
from django.dispatch import receiver
import os


# Create your models here.
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.PositiveIntegerField()
    category = models.TextField()
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/products/", blank=True, null=True)

    def __str__(self):
        return self.name


@receiver(pre_delete, sender=Product)
def delete_product_image(sender, instance, **kwargs):
    if instance.image:
        image_path = instance.image.path
        if os.path.exists(image_path):
            os.remove(image_path)


pre_delete.connect(delete_product_image, sender=Product)
