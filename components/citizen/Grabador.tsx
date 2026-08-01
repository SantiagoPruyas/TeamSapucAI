'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Mic } from 'lucide-react'
import Waveform from './Waveform'
import AlternativaTexto from './AlternativaTexto'

const MAX_MS = 15000

type Props = {
  onEnviar: (texto: string) => void
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      resolve(result.split(',')[1] || '')
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/**
 * Grabador real de sapucai: press-and-hold para grabar (como apps de
 * mensajería), tope de 15s, waveform en vivo, transcripción real vía
 * /api/ia/transcribir con degradación a mock. Si no hay micrófono
 * disponible, cae a AlternativaTexto — nunca un callejón sin salida.
 */
export default function Grabador({ onEnviar }: Props) {
  const [soportado, setSoportado] = useState(true)
  const [sinPermiso, setSinPermiso] = useState(false)
  const [grabando, setGrabando] = useState(false)
  const [procesando, setProcesando] = useState(false)
  const [transcripcion, setTranscripcion] = useState<string | null>(null)
  const [fuente, setFuente] = useState<'gemini' | 'mock' | null>(null)
  const [segundos, setSegundos] = useState(0)
  const [streamActivo, setStreamActivo] = useState<MediaStream | null>(null)

  const streamRef = useRef<MediaStream | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setSoportado(false)
    }
  }, [])

  const limpiarTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
    timeoutRef.current = null
    intervalRef.current = null
  }

  const detenerStream = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    setStreamActivo(null)
  }

  const procesarBlob = useCallback(async (blob: Blob, mime: string) => {
    setProcesando(true)
    try {
      const base64 = await blobToBase64(blob)
      const res = await fetch('/api/ia/transcribir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioBase64: base64, mime }),
      })
      const data = await res.json()
      setTranscripcion(typeof data?.transcripcion === 'string' ? data.transcripcion : '')
      setFuente(data?.fuente === 'gemini' ? 'gemini' : 'mock')
    } catch (err) {
      console.error('Error transcribiendo sapucai', err)
      setTranscripcion('Transcripción no disponible (modo demo sin conexión)')
      setFuente('mock')
    } finally {
      setProcesando(false)
    }
  }, [])

  const handlePointerDown = useCallback(async () => {
    if (grabando || procesando || transcripcion !== null) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      setStreamActivo(stream)

      const mimePreferido = 'audio/webm'
      const mime = typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported(mimePreferido)
        ? mimePreferido
        : ''
      const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream)
      recorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        limpiarTimers()
        setGrabando(false)
        const tipoFinal = recorder.mimeType || mime || 'audio/webm'
        const blob = new Blob(chunksRef.current, { type: tipoFinal })
        detenerStream()
        procesarBlob(blob, tipoFinal)
      }

      recorder.start()
      setGrabando(true)
      setSegundos(0)
      intervalRef.current = setInterval(() => setSegundos(s => s + 1), 1000)
      timeoutRef.current = setTimeout(() => {
        if (recorderRef.current && recorderRef.current.state !== 'inactive') {
          recorderRef.current.stop()
        }
      }, MAX_MS)
    } catch (err) {
      console.error('getUserMedia rechazado', err)
      detenerStream()
      setSinPermiso(true)
    }
  }, [grabando, procesando, transcripcion, procesarBlob])

  const handlePointerUp = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state === 'recording') {
      recorderRef.current.stop()
    }
  }, [])

  useEffect(() => {
    return () => {
      limpiarTimers()
      detenerStream()
    }
  }, [])

  if (!soportado || sinPermiso) {
    return (
      <AlternativaTexto
        onEnviar={onEnviar}
        motivo={sinPermiso ? 'No nos diste permiso para usar el micrófono.' : 'Tu navegador no soporta grabación de audio.'}
      />
    )
  }

  if (transcripcion !== null) {
    return (
      <div className="w-full">
        <div className="tarjeta-blanca mb-6">
          <p className="t-label text-tinta-tenue mb-2">
            Transcripción{fuente === 'mock' ? ' (modo demo)' : ''}
          </p>
          <p className="t-body text-tinta">{transcripcion || 'No se pudo transcribir el audio.'}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => { setTranscripcion(null); setFuente(null); setSegundos(0) }}
            className="flex-1 border border-indigo-campo py-4 rounded-full font-bold uppercase tracking-widest text-indigo-campo hover:bg-lienzo"
          >
            Regrabar
          </button>
          <button
            onClick={() => onEnviar(transcripcion)}
            className="flex-1 bg-indigo-campo sombra-boton py-4 rounded-full font-bold uppercase tracking-widest text-blanco-cosido hover:opacity-90"
          >
            Enviar
          </button>
        </div>
      </div>
    )
  }

  if (procesando) {
    return (
      <div className="w-full flex flex-col items-center py-12">
        <div className="w-full h-24 rounded-[20px] bg-lienzo border border-hilo animate-pulse mb-4" />
        <p className="t-label text-tinta-tenue">Procesando tu sapucai...</p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <div
          className={`absolute inset-0 border-[3px] border-indigo-campo rounded-full pointer-events-none ${grabando ? 'animate-ping opacity-20' : ''}`}
        />
        <button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={grabando ? handlePointerUp : undefined}
          className={`w-56 h-56 rounded-full flex flex-col items-center justify-center transition-colors select-none touch-none ${
            grabando ? 'bg-indigo-campo/10' : 'bg-blanco-cosido border-2 border-indigo-campo'
          }`}
        >
          {grabando ? (
            <>
              <Waveform stream={streamActivo} />
              <span className="font-bold text-2xl text-indigo-campo tabular-nums mt-2">
                00:{segundos.toString().padStart(2, '0')}
              </span>
            </>
          ) : (
            <div className="flex flex-col items-center px-4 text-center">
              <Mic size={48} className="text-indigo-campo mb-2" />
              <span className="font-bold text-indigo-campo">Mantené presionado para grabar</span>
            </div>
          )}
        </button>
      </div>
      <p className="t-label text-tinta-tenue text-center">Hasta 15 segundos</p>
    </div>
  )
}
