from tensorflow.keras.models import load_model
import numpy as np
import librosa

model = load_model("Emotion_Recognizer.h5")

def extract_mfcc(filename):
    y, sr = librosa.load(filename, duration=3, offset=0.5)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
    mfcc_mean = np.mean(mfcc.T, axis=0)  # shape: (40,)
    return mfcc_mean

def main():
    mfcc = extract_mfcc("Angerrec.wav")
    mfcc = np.reshape(mfcc, (1, 40, 1))  # reshape to (batch_size, 40, 1)
    prediction = model.predict(mfcc)
    predicted_label = np.argmax(prediction)

    print("Predicted class index:", predicted_label)

if __name__ == "__main__":
    main()
