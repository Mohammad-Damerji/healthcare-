import pickle
import warnings
warnings.filterwarnings('ignore')
###################################################


def convert_data(Age, Sex, ChestPainType, RestingBP, FastingBS, RestingECG):

    data = []
    # Age
    data.append(Age)

    # Sex
    if Sex == "M":
        data.append(1)
    else:
        data.append(0)

    # ChestPainType
    if ChestPainType == "ATA":
        data.append(1)
    elif ChestPainType == "NAP":
        data.append(2)
    elif ChestPainType == "ASY":
        data.append(0)
    else:
        data.append(3)

    # RestingBP
    data.append(RestingBP)

    # FastingBS
    data.append(FastingBS)

    # RestingECG
    if RestingECG == "Normal":
        data.append(1)
    elif RestingECG == "ST":
        data.append(2)
    else:
        data.append(0)

    return data
######################################################


def heart_model(user_info):

    Age = user_info["Age"]
    Sex = user_info["Sex"]
    ChestPainType = user_info["ChestPainType"]
    RestingBP = user_info["RestingBP"]
    FastingBS = user_info["FastingBS"]
    RestingECG = user_info["RestingECG"]

    data = convert_data(Age, Sex, ChestPainType,
                        RestingBP, FastingBS, RestingECG)

    HeartDisease_model_LR = pickle.load(
        open("healthcare\models\Heart\HeartDisease_model_LR.sav", 'rb'))
    probability = HeartDisease_model_LR.predict_proba([data])

    # print(
    #     f"There is an {probability[0][1]:.0%} chance that would be diagnosed to have heart disease.")
    return "{0:.0%}".format(probability[0][1])
####################################################


result = heart_model(user_info={"Age": 10, "Sex": "M", "ChestPainType": "NAP",
                     "RestingBP": 160, "FastingBS": 0, "RestingECG": "Normal"})

print(result)
