'use client'

import React, { useEffect, useState } from 'react'
import { getFeed } from '@/lib/mock/api.citizen'
import { Propuesta, Interes } from '@/lib/types'
import { CabeceraCiudadano } from '@/components/citizen/CabeceraCiudadano'
import { FiltroIntereses } from '@/components/citizen/FiltroIntereses'
import { EstandarteFeed } from '@/components/citizen/EstandarteFeed'
import Link from 'next/link'
import { Inbox } from 'lucide-react'

type PropuestaFeed = Propuesta & { interesesDetalle?: Interes[] }

export default function FeedCiudadanoPage() {
  const [feed, setFeed] = useState<PropuestaFeed[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [interesesMock, setInteresesMock] = useState<string[]>([])

  useEffect(() => {
    async function load() {
      // Como estamos mockeando, vamos a simular que el usuario eligió un par de intereses.
      // O podemos leer de localStorage si Lara guardó algo en el onboarding.
      let interesGuardados: string[] = []
      try {
        const perfilStr = localStorage.getItem('sapucai_perfil')
        if (perfilStr) {
          const p = JSON.parse(perfilStr)
          if (p.intereses) interesGuardados = p.intereses
        }
      } catch (e) {
        // ignore
      }

      // Fallback si no viene del onboarding
      if (interesGuardados.length === 0) {
        interesGuardados = ['salud', 'educacion']
      }

      setInteresesMock(interesGuardados)

      try {
        const data = await getFeed(interesGuardados)
        setFeed(data as PropuestaFeed[])
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-[#0D1730]">
      {/* Columna central simulando mobile en desktop */}
      <div className="w-full max-w-[420px] mx-auto min-h-screen bg-[#17264A] shadow-2xl relative flex flex-col">
        
        <CabeceraCiudadano />
        <FiltroIntereses interesesCount={interesesMock.length} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
               <div className="animate-pulse text-[#C89A3C] font-display font-bold uppercase tracking-widest text-sm">
                 Buscando novedades...
               </div>
            </div>
          ) : feed.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center h-64 px-4 bg-[#14181F]/20 rounded-sm border border-[#14181F]/30">
              <Inbox size={48} className="text-[#5A6472] mb-4 opacity-50" />
              <h2 className="text-[#FBFAF7] font-display uppercase tracking-wider text-xl font-bold mb-2">
                Sin novedades
              </h2>
              <p className="text-[#D6CFC0] font-body text-sm mb-6">
                Todavía no hay nada publicado sobre los temas que elegiste.
              </p>
              <Link 
                href="/onboarding"
                className="bg-[#C89A3C] hover:bg-[#b08735] text-[#14181F] font-body font-semibold px-6 py-2.5 rounded transition-colors"
              >
                Agregar más temas
              </Link>
            </div>
          ) : (
            <div className="flex flex-col">
              {feed.map((propuesta, idx) => (
                <Link key={propuesta.id} href={`/detalle/${propuesta.id}`} className="block focus:outline-none focus:ring-2 focus:ring-[#C89A3C] rounded-sm">
                  <EstandarteFeed 
                    propuesta={propuesta} 
                    destacado={idx === 0} 
                  />
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
