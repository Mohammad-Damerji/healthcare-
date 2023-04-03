from django.shortcuts import render
from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from healthcare.backend.app.utils.response_maker import make_response


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def predict(request, ):
    return Response(make_response(True, message="Coming soon..."))
