'use client'

import React, { useRef, useState } from 'react'
import { Play, Pause, VolumeX } from 'lucide-react'

// Un solo audio puede sonar a la vez en todo el panel: guardamos la referencia
// del último <audio> reproduciéndose a nivel de módulo (singleton simple, sin contexto).
let audioSonando: HTMLAudioElement | null = null

interface ReproductorProps {
  audioUrl: string | null
  duracionSeg: number | null
}

export function Reproductor({ audioUrl, duracionSeg }: ReproductorProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [noDisponible, setNoDisponible] = useState(false)

  if (!audioUrl) {
    return (
      <span className="t-label text-tinta-tenue flex items-center gap-1.5">
        <VolumeX size={14} /> audio no disponible en la demo
      </span>
    )
  }

  if (noDisponible) {
    return (
      <span className="t-label text-tinta-tenue flex items-center gap-1.5">
        <VolumeX size={14} /> audio no disponible en la demo
      </span>
    )
  }

  const handleToggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl)
      audioRef.current.addEventListener('ended', () => setIsPlaying(false))
      audioRef.current.addEventListener('pause', () => setIsPlaying(false))
      audioRef.current.addEventListener('error', () => {
        setNoDisponible(true)
        setIsPlaying(false)
      })
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    // Pausar cualquier otro audio que estuviera sonando
    if (audioSonando && audioSonando !== audioRef.current) {
      audioSonando.pause()
    }
    audioSonando = audioRef.current

    audioRef.current.play().catch(() => {
      setNoDisponible(true)
      setIsPlaying(false)
    })
    setIsPlaying(true)
  }

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-1.5 t-label text-indigo-campo hover:underline"
      type="button"
    >
      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      {isPlaying ? 'Pausar' : 'Reproducir'}
      {duracionSeg != null && <span className="text-tinta-tenue">({duracionSeg}s)</span>}
    </button>
  )
}
