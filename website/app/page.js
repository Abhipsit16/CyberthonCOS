"use client"
import { useState, useRef } from "react"
import Recorder from "recorder-js"
import Link from "next/link"

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
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-mono overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full animate-pulse-slow bg-grid"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        <h1 className="text-4xl font-bold text-cyan-300 drop-shadow-glow mb-3">⚡ NeuroVox</h1>
        <p className="text-gray-300 mb-8 text-lg">Emotion Detection for Emergency Calls</p>
        <Link className="text-xl text-white bg-red-500 rounded-md p-4 mb-4 hover:bg-green-500" href='/about'>About NeuroVox</Link>

        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-200 ease-in-out"
          >
            🎙️ Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-200 ease-in-out"
          >
            ⏹️ Stop Recording
          </button>
        )}

        {isRecording && <p className="mt-4 text-yellow-400 animate-pulse">Recording in progress...</p>}
        {isUploading && <p className="mt-4 text-blue-300 animate-pulse">Uploading and analyzing...</p>}

        {emotionResult && !isUploading && (
          <div className="mt-8 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-cyan-400 shadow-lg text-white space-y-2">
            <p className="text-xl font-semibold">🧠 Analysis Result</p>
            <p>Emotion: <span className="font-bold text-pink-400">{emotionResult}</span></p>
            <p>Confidence: <span className="font-bold text-purple-300">{confidenceResult.toFixed(2)}%</span></p>
          </div>
        )}
      </div>
    </div>
  )
}
