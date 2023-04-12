from django.core.validators import RegexValidator
from rest_framework import serializers
from .models import Profile

from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class ProfileSerializer(serializers.ModelSerializer):
    phone_regex = RegexValidator(
        regex=r'^\+36\d{9}$',
        message="Phone number must be entered in the format: '+36XXXXXXXXX'."
    )

    phone_number = serializers.CharField(validators=[phone_regex], required=True, max_length=12)

    class Meta:
        model = Profile
        fields = ('gender', 'phone_number', 'birth_date')
