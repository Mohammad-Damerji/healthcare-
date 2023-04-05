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
    # TODO: validate data
    gender = request.data.get("gender")
    age = request.data.get("age")
    hypertension = request.data.get("hypertension")
    heart_disease = request.data.get("heart_disease")
    Residence_type = request.data.get("Residence_type")
    avg_glucose_level = request.data.get("avg_glucose_level")
    bmi = request.data.get("bmi")
    smoking_status = request.data.get("smoking_status")
    return Response(make_response(True, message="Coming soon...", data=request.data))
