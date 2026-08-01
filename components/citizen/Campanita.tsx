'use client'

import { useEffect, useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import { contarNoLeidas } from '@/lib/mock/api.citizen'

const LS_KEY = 'sapucai:respuesta-publicada'

/**
 * Campanita de notificaciones. Muestra un badge cuando hay notificaciones no
 * leídas. Además de las notificaciones mockeadas, escucha en vivo la clave de
 * localStorage `sapucai:respuesta-publicada`:
 *  1. Listener de 'storage' — solo dispara cross-tab, nunca en la misma pestaña
 *     que escribió.
 *  2. Poll cada 2s — es lo que hace que la demo funcione cuando el diputado
 *     publica en otra pestaña del mismo navegador.
 */
export default function Campanita() {
  const [noLeidas, setNoLeidas] = useState(0)
  const ultimoValorRef = useRef<string | null>(null)

  useEffect(() => {
    let activo = true
    contarNoLeidas()
      .then(n => {
        if (activo) setNoLeidas(n)
      })
      .catch(() => {
        // Degradación silenciosa: si falla el mock, dejamos el contador en 0.
      })
    return () => {
      activo = false
    }
  }, [])

  useEffect(() => {
    // Tomamos el valor actual como línea de base: solo los CAMBIOS a partir
    // de acá suman una notificación nueva.
    try {
      ultimoValorRef.current = localStorage.getItem(LS_KEY)
    } catch {
      ultimoValorRef.current = null
    }

    function aplicarSiCorresponde(raw: string | null) {
      if (!raw || raw === ultimoValorRef.current) return
      ultimoValorRef.current = raw
      setNoLeidas(n => n + 1)
    }

    function onStorage(e: StorageEvent) {
      if (e.key === LS_KEY) aplicarSiCorresponde(e.newValue)
    }
    window.addEventListener('storage', onStorage)

    const interval = setInterval(() => {
      try {
        aplicarSiCorresponde(localStorage.getItem(LS_KEY))
      } catch {
        // ignore
      }
    }, 2000)

    return () => {
      window.removeEventListener('storage', onStorage)
      clearInterval(interval)
    }
  }, [])

  return (
    <Link
      href="/notificaciones"
      className="relative text-indigo-campo hover:opacity-80 transition-opacity"
      aria-label="Notificaciones"
    >
      <Bell size={22} />
      {noLeidas > 0 && (
        <span className="absolute -top-1 -right-1 bg-cochinilla text-blanco-cosido text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
          {noLeidas > 9 ? '9+' : noLeidas}
        </span>
      )}
    </Link>
  )
}
