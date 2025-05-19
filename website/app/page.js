"use client"
import { useState, useRef } from "react"
import Recorder from "recorder-js"

export default function Home() {
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [emotionResult, setEmotionResult] = useState(null)
  const [confidenceResult, setConfidenceResult] = useState(null)

  const audioContextRef = useRef(null)
  const recorderRef = useRef(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      recorderRef.current = new Recorder(audioContextRef.current)

      await recorderRef.current.init(stream)
      await recorderRef.current.start()

      setIsRecording(true)
      setEmotionResult(null)
      setConfidenceResult(null)
    } catch (err) {
      alert("Microphone access denied or not supported.")
      console.error(err)
    }
  }

  const stopRecording = async () => {
    if (!recorderRef.current) return

    try {
      const { blob } = await recorderRef.current.stop()
      setIsRecording(false)

      const file = new File([blob], "recording.wav", { type: "audio/wav" })
      const formData = new FormData()
      formData.append("file", file)

      setIsUploading(true)

      const res = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json()
        alert("Upload failed: " + (errorData.error || "Unknown error"))
        setIsUploading(false)
        return
      }

      const data = await res.json()
      setEmotionResult(data.emotion)
      setConfidenceResult(data.confidence)
      setIsUploading(false)
    } catch (error) {
      alert("Upload failed.")
      console.error(error)
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🎤 Emotion Detection Recorder</h1>

      {!isRecording ? (
        <button
          onClick={startRecording}
          className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600"
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
        >
          Stop Recording
        </button>
      )}

      {isRecording && <p className="mt-4 text-yellow-600">🎙️ Recording...</p>}
      {isUploading && <p className="mt-4 text-blue-600">⏳ Uploading and Processing...</p>}

      {emotionResult && !isUploading && (
        <div className="mt-6 text-center space-y-2">
          <p className="text-xl font-semibold">🧠 Prediction Result:</p>
          <p className="text-lg">Emotion: <span className="font-bold text-purple-700">{emotionResult}</span></p>
          <p className="text-lg">Confidence: <span className="font-bold text-indigo-700">{(confidenceResult * 100).toFixed(2)}%</span></p>
        </div>
      )}
    </div>
  )
}
