'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { getNotificaciones } from '@/lib/mock/api.citizen'
import type { Notificacion } from '@/lib/types'
import { ListaNotificaciones } from '@/components/citizen/ListaNotificaciones'

export default function NotificacionesPage() {
  const router = useRouter()
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let activo = true
    getNotificaciones()
      .then(data => {
        if (activo) setNotificaciones(data)
      })
      .catch(() => {
        if (activo) setNotificaciones([])
      })
      .finally(() => {
        if (activo) setIsLoading(false)
      })
    return () => {
      activo = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-blanco-cosido font-body text-tinta flex flex-col items-center">
      <div className="w-full max-w-[420px] bg-blanco-cosido min-h-screen relative shadow-2xl flex flex-col">
        <header className="px-6 py-4 flex items-center relative border-b border-hilo">
          <button onClick={() => router.back()} className="text-tinta absolute left-6">
            <ChevronLeft size={24} />
          </button>
          <h1 className="flex-1 text-center font-bold text-tinta">Notificaciones</h1>
        </header>

        <main className="flex-1 p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-pulse t-label text-tinta-tenue">Cargando...</div>
            </div>
          ) : (
            <ListaNotificaciones notificaciones={notificaciones} />
          )}
        </main>
      </div>
    </div>
  )
}
