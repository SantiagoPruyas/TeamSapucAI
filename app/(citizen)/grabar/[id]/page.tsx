'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, Play, Square, Mic, CheckCircle2 } from 'lucide-react'

export default function GrabarSapucaiMockup() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [isEnviado, setIsEnviado] = useState(false)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval: any
    if (isRecording) {
      interval = setInterval(() => {
        setTime(t => {
          if (t >= 15) {
            setIsRecording(false)
            setIsDone(true)
            return 15
          }
          return t + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const handleStart = () => {
    setIsRecording(true)
    setIsDone(false)
    setTime(0)
  }

  const handleStop = () => {
    setIsRecording(false)
    setIsDone(true)
  }

  const formatTime = (secs: number) => `00:${secs.toString().padStart(2, '0')}`

  if (isEnviado) {
    return (
      <div className="min-h-screen bg-[#FBFAF7] font-body text-[#14181F] flex flex-col items-center">
        <div className="w-full max-w-[420px] bg-white min-h-screen relative shadow-2xl flex flex-col items-center justify-center p-6 text-center">
          <CheckCircle2 size={80} className="text-[#1E6B45] mb-6" />
          <h1 className="text-2xl font-bold font-display uppercase tracking-wider mb-4">¡Tu Sapucai fue enviado!</h1>
          <p className="text-gray-600 mb-12 text-lg">La IA lo está procesando. Te avisaremos cuando haya novedades.</p>
          <button 
            onClick={() => router.push('/feed')}
            className="w-full bg-[#17264A] text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-blue-900"
          >
            Entendido
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBFAF7] font-body text-[#14181F] flex flex-col items-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen relative shadow-2xl flex flex-col">
        
        {/* Header */}
        <header className="px-6 py-4 flex items-center relative border-b border-gray-100">
          <button onClick={() => router.back()} className="text-gray-900 absolute left-6">
            <ChevronLeft size={24} />
          </button>
          <h1 className="flex-1 text-center font-bold text-gray-900">Grabar Sapucai</h1>
        </header>

        <main className="flex-1 flex flex-col items-center p-6 pt-12">
          
          <h2 className="text-center font-bold text-xl mb-2">
            Hablá cuando quieras,
          </h2>
          <p className="text-center text-gray-500 mb-12">
            tenés hasta 15 segundos.
          </p>

          {/* Grabadora Visual */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            <div className={`absolute inset-0 border-[3px] border-[#17264A] rounded-full ${isRecording ? 'animate-ping opacity-20' : ''}`}></div>
            <button 
              onClick={isRecording ? handleStop : handleStart}
              className={`w-56 h-56 rounded-full flex flex-col items-center justify-center transition-colors ${
                isRecording ? 'bg-[#17264A]/10' : 'bg-white border-2 border-[#17264A]'
              }`}
            >
              {isRecording ? (
                <>
                  <div className="flex items-center gap-1 mb-4 h-16">
                     {/* Pseudo waveform animation */}
                     {[1,2,3,4,5,4,3,2,1].map((h, i) => (
                       <div key={i} className="w-1.5 bg-[#17264A] rounded-full animate-pulse" style={{ height: `${h * 12}px`, animationDelay: `${i * 0.1}s` }}></div>
                     ))}
                  </div>
                  <span className="font-bold text-2xl text-[#17264A] tabular-nums">{formatTime(time)}</span>
                </>
              ) : (
                <div className="flex flex-col items-center">
                  <Mic size={48} className="text-[#17264A] mb-2" />
                  <span className="font-bold text-[#17264A]">Tocar para grabar</span>
                </div>
              )}
            </button>
          </div>

          {/* Player de preview */}
          {isDone && (
            <div className="w-full mt-4">
              <p className="text-center text-sm font-semibold text-gray-500 mb-3">Escuchá antes de enviar</p>
              <div className="bg-[#F2F9F9] rounded-full px-4 py-3 flex items-center gap-3">
                <button className="text-[#17264A]"><Play size={20} fill="currentColor" /></button>
                <div className="flex-1 h-1 bg-teal-200 rounded-full"></div>
                <span className="text-sm font-bold text-[#17264A] tabular-nums">{formatTime(time)}</span>
              </div>
            </div>
          )}

        </main>

        {/* Footer */}
        <div className="p-6 flex gap-4">
          <button 
            onClick={() => router.back()}
            className="flex-1 border border-gray-300 py-4 rounded-full font-bold uppercase tracking-widest text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button 
            disabled={!isDone}
            onClick={() => setIsEnviado(true)}
            className={`flex-1 py-4 rounded-full font-bold uppercase tracking-widest text-white transition-colors ${
              isDone ? 'bg-[#17264A] hover:bg-blue-900' : 'bg-gray-300'
            }`}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
