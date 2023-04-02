from django.contrib.auth import authenticate, login
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

# from .serializers import SignUpSerializer
from .tokens import create_jwt_pair_for_user
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class SignUpView(generics.GenericAPIView):
    # serializer_class = SignUpSerializer
    permission_classes = []

    @csrf_exempt
    def post(self, request: Request):
        email = request.data.get("email")
        password = request.data.get("password")
        username = request.data.get("username")

        user = User.objects.create_user(username, email=email, password=password)
        response = {"message": "User Created Successfully"}

        return Response(data=response, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = []

    @csrf_exempt
    def post(self, request: Request):
        email = request.data.get("email")
        password = request.data.get("password")
        username = request.data.get("username")
        print(email)
        print(password)
        print(username)
        user = authenticate(request, username=username, password=password)

        if user is not None:
            tokens = create_jwt_pair_for_user(user)
            # login(request, user)
            response = {"message": "Login Successfull", "tokens": tokens}
            return Response(data=response, status=status.HTTP_200_OK)

        else:
            return Response(data={"message": "Invalid email or password"})

    @authentication_classes([BasicAuthentication])
    def get(self, request: Request):
        content = {"user": str(request.user), "auth": str(request.auth)}

        return Response(data=content, status=status.HTTP_200_OK)
