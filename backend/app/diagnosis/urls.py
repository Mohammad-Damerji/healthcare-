from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import predict_stroke, predict_heart, predict_xray

urlpatterns = [
    path("predict/stroke/", predict_stroke, name="Predict Stroke"),
    path("predict/heart-disease/", predict_heart, name="Predict Heart Disease"),
    path("predict/xray/", predict_xray, name="Predict xray"),

]
