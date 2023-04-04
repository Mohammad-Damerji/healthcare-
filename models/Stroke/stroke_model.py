import pickle
import warnings
warnings.filterwarnings('ignore')
###################################################


def convert_data(gender, age, hypertension, heart_disease, Residence_type, avg_glucose_level, bmi, smoking_status):

    data = []
    # gender
    if gender == "Male":
        data.append(1)
    elif gender == "Female":
        data.append(0)
    else:
        data.append(2)
    # age
    data.append(age)
    # hypertension
    if hypertension == "No":
        data.append(0)
    else:
        data.append(1)
    # heart_disease
    if heart_disease == "No":
        data.append(0)
    else:
        data.append(1)
    # Residence_type
    if Residence_type == "Rural":
        data.append(0)
    else:
        data.append(1)
    # avg_glucose_level
    data.append(avg_glucose_level)
    # bmi
    data.append(bmi)
    # smoking_status
    if smoking_status == "formerly smoked":
        data.append(1)
    elif smoking_status == "never smoked":
        data.append(2)
    elif smoking_status == "smokes":
        data.append(3)
    else:
        data.append(4)

    return data
######################################################


def stroke_model(gender, age, hypertension, heart_disease, Residence_type, avg_glucose_level, bmi, smoking_status):

    data = convert_data(gender, age, hypertension, heart_disease,
                        Residence_type, avg_glucose_level, bmi, smoking_status)

    stroke_model_LR = pickle.load(open("stroke_model_LR.sav", 'rb'))
    # result = stroke_model_LR.predict([data])
    probability = stroke_model_LR.predict_proba([data])

    print(
        f"There is an {probability[0][1]:.0%} chance that you will have a stroke.")
####################################################


stroke_model(gender="Male", age=67, hypertension="No", heart_disease="Yes",
             Residence_type="Yes", avg_glucose_level=228.69, bmi=36.6, smoking_status="formerly smoked")
