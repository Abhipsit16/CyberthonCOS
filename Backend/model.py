from tensorflow.keras.models import load_model
import numpy as np
import librosa

model = load_model("Emotion_Recognizer.h5")

def convertToEmotion(x):
    maping={
        0:'angry',
        1:'disgust',
        2:'fear',
        3:'happy',
        4:'neutral',
        5:'pleasant surprise',
        6:'sad'
    }
    return maping[x]

def extract_mfcc(filename):
    y, sr = librosa.load(filename, duration=8, offset=0.5)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
    mfcc_mean = np.mean(mfcc.T, axis=0)
    return mfcc_mean

async def predict(filename):
    mfcc = extract_mfcc(filename=filename)
    mfcc = np.reshape(mfcc, (1, 40, 1))  # reshape to (batch_size, 40, 1)
    prediction = model.predict(mfcc)
    confidence=np.max(prediction)*100
    predicted_label = np.argmax(prediction)
    return convertToEmotion(predicted_label), confidence



