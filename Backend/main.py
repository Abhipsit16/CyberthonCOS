from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import numpy as np
from scipy.io import wavfile
from scipy.signal import stft, istft
import uuid
from model import predict

app = FastAPI()

origins = [
    "http://localhost:3000",  # your frontend URL and port
    "http://127.0.0.1:3000",
    # you can add more origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)


def reduce_noise(input_path: str, output_path: str):
    # Read wav file
    rate, data = wavfile.read(input_path)

    # If stereo, convert to mono by averaging channels
    if len(data.shape) > 1:
        data = data.mean(axis=1)

    # Use first 0.5 seconds as noise sample
    noise_sample = data[:int(rate * 0.5)]

    # Compute STFT of full signal and noise sample
    f, t, Zxx = stft(data, fs=rate)
    _, _, Zxx_noise = stft(noise_sample, fs=rate)

    # Magnitude spectrograms
    mag = np.abs(Zxx)
    mag_noise = np.abs(Zxx_noise)

    # Noise profile: mean magnitude across time frames of noise sample
    noise_profile = np.mean(mag_noise, axis=1, keepdims=True)

    # Threshold to mask noise components
    threshold = noise_profile * 1.5

    # Create mask where magnitude is greater than threshold
    mask = mag > threshold

    # Apply mask to original magnitude
    filtered_mag = mag * mask

    # Rebuild complex STFT with original phase
    filtered_Zxx = filtered_mag * np.exp(1j * np.angle(Zxx))

    # Inverse STFT to get denoised signal
    _, denoised = istft(filtered_Zxx, fs=rate)

    # Normalize denoised signal to int16 range if needed
    denoised = np.real(denoised)
    denoised = denoised / np.max(np.abs(denoised))  # normalize to -1..1
    denoised_int16 = (denoised * 32767).astype(np.int16)

    # Save denoised wav file
    wavfile.write(output_path, rate, denoised_int16)


@app.post("/upload/")
async def upload_audio(file: UploadFile = File(...)):
    file_ext = file.filename.split(".")[-1].lower()

    if file_ext != "wav":
        return JSONResponse(
            status_code=400,
            content={"error": "Only WAV files are supported."}
        )

    unique_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_FOLDER, f"{unique_id}_input.wav")
    output_path = os.path.join(PROCESSED_FOLDER, f"{unique_id}_denoised.wav")

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        reduce_noise(input_path, output_path)
        emotion, confidence = await predict(output_path)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": f"Noise reduction failed: {str(e)}"}
        )

    return JSONResponse({
        "emotion": emotion,
        "confidence": float(confidence),
    })
