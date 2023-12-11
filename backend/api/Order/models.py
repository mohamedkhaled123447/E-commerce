from django.db import models
from Accounts.models import User

# Create your models here.


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    choices = (("pending", "pending"), ("completed", "completed"), ("cancelled", "cancelled"))
    status = models.CharField(choices=choices, default="pending", max_length=20)
    def __str__(self):
        return str(self.id)