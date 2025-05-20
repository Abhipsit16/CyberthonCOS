export default function ModelExplanation() {
  return (
    <section className="max-w-3xl mx-auto p-6 bg-gradient-to-tr from-cyan-900 to-blue-800 rounded-lg shadow-lg text-white font-mono my-8">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">🧠 Model Explanation</h2>
      <p className="mb-4">
        We use a <strong>multimodal architecture approach</strong> to detect emotions from audio recordings.
      </p>

      <ol className="list-decimal list-inside space-y-3">
        <li>
          <strong>CNN (Convolutional Neural Network) module:</strong>  
          Processes audio input to extract spatial features by mapping outlines, patterns, and distributions in the waveform or spectrogram. It captures local acoustic features like timbre, pitch, and frequency patterns.
        </li>
        <li>
          <strong>LSTM (Long Short-Term Memory) module:</strong>  
          Independently analyzes the audio sequence over time, capturing temporal dependencies and context. It understands how emotions evolve and flow through speech.
        </li>
        <li>
          <strong>Final Master Model:</strong>  
          Combines outputs from both CNN and LSTM modules to produce a more accurate and robust emotion prediction.
        </li>
      </ol>

      <h3 className="mt-6 text-xl font-semibold text-cyan-300">Benefits of this approach:</h3>
      <ul className="list-disc list-inside space-y-2 mt-2">
        <li>Combines spatial and temporal features for better accuracy.</li>
        <li>Distributes learning tasks, reducing overfitting.</li>
        <li>Captures fine-grained acoustic patterns and long-term context.</li>
        <li>Enhances robustness to noise and speech variations.</li>
      </ul>
    </section>
  )
}
