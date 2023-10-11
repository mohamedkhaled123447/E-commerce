from django.db import models
from Accounts.models import User


# Create your models here.
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.PositiveIntegerField()
    category = models.TextField()
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    image=models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.name
