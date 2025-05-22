# 🚨 CyberthonCOS  
### 🎯 *Smart Policing - Voice Emotion Recognition from Emergency Calls*

> “In an emergency, what you feel may be more important than what you say.”

---

## ⚠️ The Problem

Traditional emergency helplines rely too much on *verbal content*—missing hidden emotional cues critical in:

- 🚫 **Overwhelming call volumes**
- 🔇 **Chaotic background noise**, whispers, or suppressed voices  
- 🌐 **Multilingual inputs** (Hindi, Punjabi, English, Hinglish)  
- 🧍‍♀️ **Victims unable to articulate danger directly**  
- 🐢 **Delayed triage and missed red flags**  

---

## 🔥 The Solution

An **AI-powered system** that decodes *real-time emotions* in calls—even when words fail—enabling **faster, smarter, more empathetic responses**.

---

## 🧠 What We Built

An **LSTM-based Emotion Detection System** that processes **live emergency audio** to:

- 🔊 Detect emotions like **fear, panic, anger, distress**
- ⚡ **Prioritize high-urgency calls**
- 🛡️ Enable **emotion-aware policing**
- 📍 Use **location, gender, and context**
- 🔁 **Learn continuously** from real-world data

---

## 🎙️ Data & Preprocessing

### 📂 Dataset:
- **TESS Toronto Emotional Speech Dataset**
- 800+ emotion-tagged audio samples  
- Same sentence spoken in various emotions → **Text becomes irrelevant** → **Multilingual support**

### 🛠️ Preprocessing Steps:
- 🎵 Convert format to `.wav`
- 📢 Normalize volume
- 🔊 Remove noise: **FFT → High Pass Filter → Inverse FFT**
- 😮 Preserve **short silences** (breathing/stress)
- 🧹 Remove **long silences & distortions**

---

## 🤖 Why LSTM?

**LSTM (Long Short-Term Memory)** models are ideal for **sequential audio analysis**, because they:

- 🎚️ Handle **small time segments** (speaker isolation)
- 🗣️ Support **multi-speaker scenarios** (e.g., abuser yelling, victim whispering)
- 🎯 Predict emotional tone **per segment** and **aggregate over time**

---

## ⚙️ Key Features

### 1. 🚦 Real-Time Emergency Call Prioritization
- Detects **stress, fear, panic**, even in **whispers or crying**
- Auto-flags **high-emotion calls**
- Improves **response time**
- Reduces **manual dispatcher load**

---

### 2. 📲 Mobile App Integration
- Connects with **SOS apps** or **panic buttons**
- Analyzes **tone under stress**
- Sends **instant alerts** to police or mental health services

---

### 3. 🧩 Police Control Room Integration
- API-based **plug-and-play** design for existing 100/112 systems
- Adds **emotion-aware intelligence**
- Enables **automated triaging** and dispatch suggestions

---

### 4. 🧠 Continuous Learning Loop
- Learns from **every new call**
- Adapts to:
  - 🗣️ **Regional accents**
  - 🌆 **Urban noise**
  - 🌐 **Multilingual inputs**

---

### 5. 🛰️ Multi-Modal Fusion 
Combine:

- 🎧 **Audio-based emotion detection**
- 📄 **Text transcript analysis**
- 🌪️ **Background noise classification**
- 📍 **Location-based crime history**

→ Smarter, data-driven dispatch decisions

---

## 🌐 Use Cases

- 🚓 **Police Emergency Units**
- 🧕 **Women Safety Cells**
- 🧠 **Mental Health Helplines**
- 🔥 **Fire & Disaster Response**
- 🚑 **Ambulance Services**

---

## 🌟 Why Chandigarh (Pilot City)?

Chandigarh—a modern Indian city facing a **rise in domestic violence, cybercrime, and public safety threats**—is the **ideal testbed** for this AI-first emergency response model.

- Emotion-aware triage = **faster response**, **higher trust**, **safer cities**

---

## 📈 Impact

- 🕐 **Faster police dispatch**
- 🔎 **Better urgency detection**
- 💬 **Support for silent or suppressed victims**
- 📞 **Smarter call routing & prioritization**
- 🛡️ **New standard for tech-enabled public safety in India**

- ## Project Update

- Developed the initial version of the model.
- Built a basic UI interface for the project.
- **Planned Features:**
  - Integration of location tracking for incoming/outgoing calls.
  - Integration of the calling system within the application.
 
---

## How to test?

- ## Clone the repository to local system
```
git clone https://github.com/Abhipsit16/CyberthonCOS
```
- ## Change directory to website and run
```
npm i
npm run dev
```
- ## Come to the root directory, change directory to Backend then run
```
uv sync
uv run -- uvicorn main:app --reload
```

### You need to have node and uv installed in your system and added to environment variables

