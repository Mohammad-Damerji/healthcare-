from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, null=True)
    phone_number = models.CharField(max_length=12, unique=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.username
