'use client'

import { useEffect, useRef, useState } from 'react'
import { getRespuesta } from '@/lib/mock/api.citizen'
import type { Respuesta } from '@/lib/types'

const LS_KEY = 'sapucai:respuesta-publicada'

type Props = {
  propuestaId: string
}

/**
 * Muestra la respuesta pública del diputado con el "Sello" — el único
 * elemento del sistema con animación de caída propia. Escucha la clave de
 * localStorage `sapucai:respuesta-publicada` con el mismo patrón poll+storage
 * que la Campanita, para que la demo funcione cuando el diputado publica en
 * otra pestaña del mismo navegador mientras el ciudadano ya está en esta página.
 */
export default function RespuestaDiputado({ propuestaId }: Props) {
  const [respuesta, setRespuesta] = useState<Respuesta | null>(null)
  const ultimoValorRef = useRef<string | null>(null)

  useEffect(() => {
    let activo = true
    getRespuesta(propuestaId)
      .then(r => {
        if (activo && r) setRespuesta(r)
      })
      .catch(() => {
        // Degradación silenciosa: si falla el mock, simplemente no mostramos nada.
      })
    return () => {
      activo = false
    }
  }, [propuestaId])

  useEffect(() => {
    function aplicarSiCorresponde(raw: string | null) {
      if (!raw || raw === ultimoValorRef.current) return
      ultimoValorRef.current = raw
      try {
        const parsed = JSON.parse(raw)
        if (parsed?.propuestaId === propuestaId && parsed?.texto) {
          setRespuesta(prev => ({
            id: `r-local-${propuestaId}-${parsed.publicadaAt || Date.now()}`,
            propuestaId,
            diputado: prev?.diputado || { id: '', nombre: 'El diputado', bloque: '' },
            texto: parsed.texto,
            audioUrl: null,
            createdAt: parsed.publicadaAt || new Date().toISOString(),
          }))
        }
      } catch {
        // JSON inválido en localStorage: lo ignoramos.
      }
    }

    // Chequeo inicial por si ya había algo publicado al montar.
    aplicarSiCorresponde(localStorage.getItem(LS_KEY))

    function onStorage(e: StorageEvent) {
      if (e.key === LS_KEY) aplicarSiCorresponde(e.newValue)
    }
    window.addEventListener('storage', onStorage)

    // El evento 'storage' no dispara en la misma pestaña que escribió: el
    // poll es lo que hace que la demo funcione entre pestañas del mismo navegador.
    const interval = setInterval(() => {
      aplicarSiCorresponde(localStorage.getItem(LS_KEY))
    }, 2000)

    return () => {
      window.removeEventListener('storage', onStorage)
      clearInterval(interval)
    }
  }, [propuestaId])

  if (!respuesta) return null

  return (
    <div key={respuesta.id} className="tarjeta-blanca mb-6 sello-entrada">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-[72px] h-[72px] rounded-full border-2 border-oro-filete flex items-center justify-center shrink-0">
          <span className="t-label text-oro-filete font-bold text-[10px] text-center leading-tight px-1">
            Sapucai<br />respondido
          </span>
        </div>
        <div>
          <h2 className="font-bold text-tinta">Respuesta del diputado</h2>
          <p className="text-xs text-tinta-tenue">
            {respuesta.diputado.nombre}
            {respuesta.diputado.bloque ? ` · ${respuesta.diputado.bloque}` : ''}
            {' · '}
            {new Date(respuesta.createdAt).toLocaleDateString('es-AR')}
          </p>
        </div>
      </div>
      <p className="t-body text-tinta leading-relaxed">{respuesta.texto}</p>

      <style jsx>{`
        .sello-entrada {
          animation: sello-cae var(--dur-sello) var(--ease-tela) both;
        }
        @keyframes sello-cae {
          from {
            opacity: 0;
            transform: translateY(-24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sello-entrada {
            animation: sello-fade var(--dur-sello) linear both;
          }
        }
        @keyframes sello-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
