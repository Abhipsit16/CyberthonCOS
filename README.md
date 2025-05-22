# CyberthonCOS
🎯 Emotion-Aware Emergency Call System for Smarter, Faster Public Safety
“In an emergency, what you feel may be more important than what you say.”

🚨 Why It Matters
Traditional emergency helpline systems rely heavily on verbal content to detect urgency. But in real-life crises—especially in domestic violence, cyber abuse, or public safety threats—emotions like fear, distress, or aggression often hide behind whispers, panic, or suppressed voices.

⚠️ The Problem:
🚫 Overwhelming call volumes

🔇 Chaotic background noise, whispers, or suppressed voices

🌐 Multilingual inputs (Hindi, Punjabi, English, Hinglish)

🧍‍♀️ Victims unable to articulate danger directly

🐢 Delayed triage and missed red flags

🔥 The Solution:
An AI-powered system that understands emotions in real time—even when words fail—helping emergency teams respond faster, smarter, and more empathetically.

🧠 What We Built
An LSTM-based Emotion Detection System that processes live audio from emergency calls to:

🔊 Detect emotions like fear, panic, anger, and distress in real-time

⚡ Prioritize high-urgency calls

🛡️ Enable emotion-aware policing

📍 Incorporate location awareness, gender, and context

🔁 Improve continuously through real-world feedback

🔍 Data & Preprocessing
🎙️ Audio Dataset
We used the TESS Toronto Emotional Speech Dataset with over 800 emotion-tagged audio samples. Every clip features the same sentence, spoken with different emotions—making the text content irrelevant.

✅ This enables multilingual compatibility even when trained on English audio, because the model learns tone, not meaning.

🔧 Preprocessing Steps
Format conversion to .wav

Volume normalization

Noise reduction via FFT → High Pass Filter → Inverse FFT

Retention of short silences to preserve breathing/stress cues

Removal of long silences and distortions

🤖 Why LSTM?
LSTM (Long Short-Term Memory) models are ideal for sequential audio processing. They retain temporal context, allowing us to:

🎚️ Break audio into small time segments (to isolate speakers)

🗣️ Handle multi-speaker scenarios (e.g. abuser yelling, victim whispering)

🎯 Predict emotional tone per segment and aggregate insights

⚙️ Key Features
1. 🚦 Real-Time Emergency Call Prioritization
Detect stress, panic, or fear even if the caller is whispering or crying.

Automatically flag emotionally intense calls

Boost response time for victims in critical danger

Reduce manual analysis load for dispatchers

2. 📲 Mobile App Integration
Integrate with SOS apps or panic buttons.

Analyze user tone in distress

Trigger instant alerts to law enforcement or mental health services

3. 🧩 Police Control Room Integration
Designed for plug-and-play API integration into existing 100/112 helpline systems.

Add emotion-aware intelligence to current infrastructure

Enable automated triaging & dispatch recommendations

4. 🧠 Continuous Learning Loop
Get smarter with every call.

Model improves with new emergency data

Adapts to regional accents, urban noise, and multilingual inputs

5. 🛰️ Multi-Modal Fusion (Coming Soon)
Combine:

Audio-based emotion detection

Text transcripts

Background noise classification

Location-based crime history
To enable smarter dispatch decisions

🌐 Use Cases
🚓 Police Emergency Units

🧕 Women Safety Cells

🧠 Mental Health Helplines

🔥 Fire & Disaster Response

🚑 Ambulance Services

🌟 Why Chandigarh (Pilot City)?
As a modern Indian city facing rising domestic, cyber, and public safety threats, Chandigarh is a perfect testbed for an AI-first policing model. Emotion-aware triage can revolutionize public trust and response times.

📈 Impact
🕐 Faster Police Dispatch

🔎 Better Urgency Detection

💬 Support for Silent or Suppressed Victims

📞 Smarter Call Routing & Prioritization

🛡️ A New Standard for Tech-Enabled Public Safety in India

