from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import predict

urlpatterns = [
    path("predict/", predict, name="predict"),
]
