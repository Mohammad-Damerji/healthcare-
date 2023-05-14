from django.contrib.auth import authenticate, login
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

# from .serializers import SignUpSerializer
from .models import Profile
from .serializers import ProfileSerializer, UserSerializer
from .tokens import create_jwt_pair_for_user
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from utils.response_maker import make_response


class SignUpView(generics.GenericAPIView):
    # serializer_class = SignUpSerializer
    permission_classes = []

    @csrf_exempt
    def post(self, request: Request):
        email = request.data.get("email")
        password = request.data.get("password")
        username = request.data.get("username") or request.data.get("email")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")

        try:
            user = User.objects.create_user(username, email=email, password=password, first_name=first_name,
                                            last_name=last_name)
        except Exception as e:
            return Response(make_response(False, message=str(e)), status=400)

        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
        else:
            user.delete()
            return Response(make_response(False, message=serializer.errors), status=400)

        return Response(data=make_response(True, message="User Created Successfully"), status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = []

    @csrf_exempt
    def post(self, request: Request):
        password = request.data.get("password")
        username = request.data.get("username")
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # tokens = create_jwt_pair_for_user(user)
            # login(request, user)
            return Response(data=make_response(True, message='User logged in successfully'), status=status.HTTP_200_OK)

        else:
            return Response(data=make_response(False, message='Invalid email or password'), status=400)


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def get_users(request, user_id):
    if user_id == 'all':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(data=make_response(success=True, data=serializer.data))
    else:
        try:
            user_id = int(user_id)
        except Exception as e:
            return Response(data=make_response(success=False, message='Path <user_id> must be integer or "all"'),
                            status=400)
        user = User.objects.filter(id=user_id)
        if user:
            serializer = UserSerializer(user, many=True)
            print(user)
            print(serializer)
            return Response(data=make_response(success=True, data=serializer.data))
        else:
            return Response(data=make_response(success=False, message='User Not found'))
