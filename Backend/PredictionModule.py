from tensorflow.keras.models import load_model
import numpy as np
import librosa

model1 = load_model("Emotion_Recognizer.h5")
model2 = load_model("emotional.h5")
master=load_model("Master.h5")

def convertToEmotion(x):
    mapping = {
        0: 'angry',
        1: 'disgust',
        2: 'fear',
        3: 'happy',
        4: 'neutral',
        5: 'pleasant surprise',
        6: 'sad'
    }
    return mapping[x]

def extract_mfcc_from_segment(y_segment, sr):
    mfcc = librosa.feature.mfcc(y=y_segment, sr=sr, n_mfcc=40)
    mfcc_mean = np.mean(mfcc.T, axis=0)
    return mfcc_mean


def predict_on_segment(model, mfcc):
    mfcc = np.reshape(mfcc, (1, 40, 1))  # reshape to (batch_size, 40, 1)
    prediction = model.predict(mfcc)
    return prediction

def split_audio(filename, clip_duration=3.0):
    y, sr = librosa.load(filename, sr=None)
    total_duration = librosa.get_duration(y=y, sr=sr)
    clips = []
    for start in np.arange(0, total_duration, clip_duration):
        end = min(start + clip_duration, total_duration)
        start_sample = int(start * sr)
        end_sample = int(end * sr)
        clips.append(y[start_sample:end_sample])
    return clips, sr

def final(pred1, pred2):
    combined_input = np.concatenate((pred1, pred2), axis=1)  # shape becomes (1, 14)
    return master.predict(combined_input)

async def predict(filename):
    clips, sr = split_audio(filename, clip_duration=3.0)
    combined_predictions = []

    for clip in clips:
        mfcc = extract_mfcc_from_segment(clip, sr)
        pred1 = predict_on_segment(model1, mfcc)
        pred2 = predict_on_segment(model2, mfcc)
        combined = pred1*0.5+pred2*0.5  # element-wise multiplication
        combined_predictions.append(combined)

    # Stack predictions and average over clips
    combined_predictions = np.vstack(combined_predictions)
    avg_prediction = np.mean(combined_predictions, axis=0)
    emotion_index = np.argmax(avg_prediction)
    emotion = convertToEmotion(emotion_index)
    confidence = avg_prediction[emotion_index]
    return emotion, confidence*100

