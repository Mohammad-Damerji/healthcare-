from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from healthcare.backend.app.utils.response_maker import make_response

from healthcare.models.Stroke.stroke_model import stroke_model
from healthcare.models.Heart.heart_model import heart_model
import os
from rest_framework.parsers import MultiPartParser, FormParser


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def predict_stroke(request, ):
    gender = request.data.get("gender")
    age = float(request.data.get("age"))
    hypertension = request.data.get("hypertension")
    heart_disease = request.data.get("heart_disease")
    Residence_type = request.data.get("Residence_type")
    avg_glucose_level = float(request.data.get("avg_glucose_level"))
    bmi = float(request.data.get("bmi"))
    smoking_status = request.data.get("smoking_status")

    # Validate the data
    if gender not in ['Male', 'Female', 'Other']:
        return Response(make_response(False, message='Invalid gender'))
    if not isinstance(age, float) or age <= 0 or age > 100:
        return Response(make_response(False, message='Invalid age'))
    if hypertension not in ['No', 'Yes']:
        return Response(make_response(False, message='Invalid hypertension status'))
    if heart_disease not in ['No', 'Yes']:
        return Response(make_response(False, message='Invalid heart disease status'))
    if Residence_type not in ['Urban', 'Rural']:
        return Response(make_response(False, message='Invalid residence type'))
    if not isinstance(avg_glucose_level, float) or avg_glucose_level <= 0:
        return Response(make_response(False, message='Invalid average glucose level'))
    if not isinstance(bmi, float) or bmi <= 0:
        return Response(make_response(False, message='Invalid BMI'))
    if smoking_status not in ['formerly smoked', 'never smoked', 'smokes', 'Unknown']:
        return Response(make_response(False, message='Invalid smoking status'))

    result = stroke_model(user_info={
        'gender': gender,
        'age': age,
        'hypertension': hypertension,
        'heart_disease': heart_disease,
        'Residence_type': Residence_type,
        'avg_glucose_level': avg_glucose_level,
        'bmi': bmi,
        'smoking_status': smoking_status
    })
    return Response(
        make_response(True, message=f"There is {result} chance that you will have a stroke.", data=result))


@api_view(['GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
def predict_heart(request, ):
    # TODO: validate data
    age = int(request.data.get('Age'))
    sex = request.data.get('Sex')
    chest_pain_type = request.data.get('ChestPainType')
    resting_bp = int(request.data.get('RestingBP'))
    fasting_bs = float(request.data.get('FastingBS'))
    resting_ecg = request.data.get('RestingECG')

    if not isinstance(age, int) or age <= 0:
        return Response(make_response(False, message='Invalid age'))
    if sex not in ['M', 'F']:
        return Response(make_response(False, message='Invalid sex'))
    if chest_pain_type not in ['ATA', 'NAP', 'ASY', 'TA']:
        return Response(make_response(False, message='Invalid chest pain type'))
    if not isinstance(resting_bp, int) or resting_bp <= 0:
        return Response(make_response(False, message='Invalid resting blood pressure'))
    if not isinstance(fasting_bs, float) or fasting_bs > 1 or fasting_bs < 0:
        return Response(make_response(False, message='Invalid fasting blood sugar status'))
    if resting_ecg not in ["Normal", "ST", "LVH"]:
        return Response(make_response(False, message='Invalid resting ECG status'))

    result = heart_model(user_info={
        'Age': age,
        'Sex': sex,
        'ChestPainType': chest_pain_type,
        'RestingBP': resting_bp,
        'FastingBS': fasting_bs,
        'RestingECG': resting_ecg
    })
    return Response(
        make_response(True, message=f"There is {result} chance that would be diagnosed to have heart disease.",
                      data=result))


@api_view(['POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes((MultiPartParser, FormParser))
def predict_xray(request):
    file = request.FILES['image']
    filename = file.name
    script_dir = os.path.dirname(os.path.relpath(__file__))
    model_file = os.path.join(script_dir, '..', '..', '..', 'models', 'Xray', 'xray_image', 'images', filename)
    with open(model_file, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    return Response(make_response(success=True, message='File uploaded successfully.'))
