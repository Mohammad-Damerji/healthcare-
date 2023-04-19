#!/usr/bin/env python
# coding: utf-8

# import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt
#
# from os import listdir
# from os.path import join, isfile, isdir
# from glob import glob
#
# from keras.preprocessing.image import ImageDataGenerator, smart_resize
# from keras.applications.densenet import DenseNet121
# from keras.layers import Dense, GlobalAveragePooling2D
# from keras.models import Model, load_model
# from keras import backend as K
#
# from PIL import Image
# from tqdm import tqdm
# get_ipython().run_line_magic('matplotlib', 'inline')

from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
import os

# import random
#
# import cv2
# import numpy as np
# from keras import backend as K
# from keras.preprocessing import image
# from tensorflow.keras import optimizers, losses, metrics
# from tensorflow.compat.v1.logging import INFO, set_verbosity


labels = ['Cardiomegaly',
          'Emphysema',
          'Effusion',
          'Hernia',
          'Infiltration',
          'Mass',
          'Nodule',
          'Atelectasis',
          'Pneumothorax',
          'Pleural_Thickening',
          'Pneumonia',
          'Fibrosis',
          'Edema',
          'Consolidation']

script_dir = os.path.dirname(os.path.relpath(__file__))
model_file = os.path.join(script_dir, 'xray_model.h5')
model = load_model(model_file)


def diag_list(predicted_values):
    diagnosis = []

    return sorted(zip(predicted_values, labels), reverse=True)[:3]

# use relative path
default_folder = os.path.join(script_dir, 'xray_image')


# accepts a folder which needs to be in this format *chestxray_input_folder\images\(image goes here)*
def disease_probability(chestxray_input_folder=default_folder, model=model):
    image_generator = ImageDataGenerator(
        samplewise_center=True,
        samplewise_std_normalization=True)
    test_datagen = image_generator.flow_from_directory(directory=chestxray_input_folder,
                                                       class_mode=None,
                                                       batch_size=1,
                                                       shuffle=False,
                                                       target_size=(320, 320))
    pred = (model.predict(test_datagen, verbose=1))
    return diag_list(pred[0])

##results will be in the form [(top probability, top disease),(2nd prob, 2nd disease), (3rd prob, 3rd disease)]
