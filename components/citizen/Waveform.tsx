'use client'

import { useEffect, useRef } from 'react'

type Props = {
  stream: MediaStream | null
}

/**
 * Dibuja el audio en vivo del stream como una curva continua ("movimiento de
 * tela"), no como barras estilo podcast. Usa AnalyserNode + canvas, sin
 * librerías de audio adicionales.
 */
export default function Waveform({ stream }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!stream) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2d = canvas.getContext('2d')
    if (!ctx2d) return

    const AudioCtxCtor = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtxCtor) return

    const audioCtx = new AudioCtxCtor()
    const source = audioCtx.createMediaStreamSource(stream)
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 1024
    source.connect(analyser)

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const strokeColor =
      getComputedStyle(document.documentElement).getPropertyValue('--indigo-campo').trim() ||
      '#17264A'

    const width = canvas.width
    const height = canvas.height

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      analyser.getByteTimeDomainData(dataArray)

      ctx2d.clearRect(0, 0, width, height)
      ctx2d.lineWidth = 2
      ctx2d.strokeStyle = strokeColor
      ctx2d.lineJoin = 'round'
      ctx2d.lineCap = 'round'
      ctx2d.beginPath()

      const slice = width / bufferLength
      let x = 0
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * height) / 2
        if (i === 0) ctx2d.moveTo(x, y)
        else ctx2d.lineTo(x, y)
        x += slice
      }
      ctx2d.stroke()
    }
    draw()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      try {
        source.disconnect()
        analyser.disconnect()
        audioCtx.close()
      } catch {
        // ignore cleanup errors
      }
    }
  }, [stream])

  return <canvas ref={canvasRef} width={160} height={56} className="w-40 h-14" />
}
