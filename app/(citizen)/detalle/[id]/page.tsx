'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, Share2, Mic } from 'lucide-react'
import Link from 'next/link'
import { getPropuesta } from '@/lib/mock/api.citizen'
import type { Interes, Propuesta } from '@/lib/types'
import RespuestaDiputado from '@/components/citizen/RespuestaDiputado'

type PropuestaDetalle = Propuesta & { interesesDetalle: Interes[] }

export default function DetallePropuestaPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [propuesta, setPropuesta] = useState<PropuestaDetalle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [textoCompleto, setTextoCompleto] = useState(false)

  useEffect(() => {
    let activo = true
    getPropuesta(id)
      .then(p => {
        if (activo) setPropuesta(p)
      })
      .catch(() => {
        if (activo) setPropuesta(null)
      })
      .finally(() => {
        if (activo) setIsLoading(false)
      })
    return () => {
      activo = false
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-blanco-cosido flex items-center justify-center">
        <div className="animate-pulse t-label text-tinta-tenue">Cargando propuesta...</div>
      </div>
    )
  }

  if (!propuesta) {
    return (
      <div className="min-h-screen bg-blanco-cosido flex flex-col items-center justify-center p-6 text-center">
        <p className="t-body text-tinta-tenue mb-6">No encontramos esta propuesta.</p>
        <button
          onClick={() => router.push('/feed')}
          className="bg-indigo-campo text-blanco-cosido sombra-boton py-3 px-6 rounded-full font-bold uppercase tracking-widest"
        >
          Volver al feed
        </button>
      </div>
    )
  }

  const categoria = propuesta.interesesDetalle[0]?.nombre || 'General'

  return (
    <div className="min-h-screen bg-blanco-cosido font-body text-tinta flex flex-col items-center">
      <div className="w-full max-w-[420px] bg-blanco-cosido min-h-screen relative shadow-2xl flex flex-col">

        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="text-tinta">
            <ChevronLeft size={24} />
          </button>
          <button className="text-tinta">
            <Share2 size={20} />
          </button>
        </header>

        <main className="flex-1 px-6 pb-32 overflow-y-auto">
          {/* Categoria — solo ícono/etiqueta, sin color de postura (Regla de la Insignia) */}
          <div className="bg-lienzo border border-hilo text-indigo-campo inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            {categoria}
          </div>

          <h1 className="text-2xl font-bold t-display uppercase tracking-wider leading-tight mb-6 text-tinta">
            {propuesta.titulo}
          </h1>

          <div className="tarjeta-blanca mb-6">
            <h2 className="font-bold text-tinta mb-2">Resumen en lenguaje llano</h2>
            <p className="text-tinta text-sm leading-relaxed mb-3">
              {propuesta.resumenIa || 'La IA todavía está procesando el resumen de esta propuesta.'}
            </p>
            <button
              onClick={() => setTextoCompleto(v => !v)}
              className="text-indigo-campo font-bold text-sm hover:underline"
            >
              {textoCompleto ? 'Ocultar texto completo' : 'Leer texto completo'}
            </button>
            {textoCompleto && (
              <p className="text-tinta-tenue text-sm leading-relaxed mt-3 whitespace-pre-line">
                {propuesta.textoOriginal}
              </p>
            )}
          </div>

          <RespuestaDiputado propuestaId={propuesta.id} />

          <div className="tarjeta-blanca text-center">
            <h3 className="font-bold text-tinta mb-1">¿Tenés dudas?</h3>
            <p className="text-tinta-tenue text-sm">Preguntale a la IA sobre esta propuesta</p>
          </div>
        </main>

        {/* Footer sticky */}
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-blanco-cosido via-blanco-cosido to-transparent pt-12">
          <Link
            href={`/grabar/${id}`}
            className="bg-indigo-campo w-full text-blanco-cosido rounded-full py-4 px-6 flex items-center justify-center gap-3 sombra-boton hover:opacity-90"
          >
            <Mic size={24} />
            <div className="text-left">
              <div className="font-display font-bold uppercase tracking-widest text-sm">Dar mi sapucai</div>
              <div className="text-xs text-hilo">Hablá hasta 15 segundos</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
