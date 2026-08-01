'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, CheckCircle2 } from 'lucide-react'
import Grabador from '@/components/citizen/Grabador'

export default function GrabarSapucaiPage() {
  const router = useRouter()
  const { id } = useParams()
  const [isEnviado, setIsEnviado] = useState(false)

  const handleEnviar = (_texto: string) => {
    // No hay persistencia real de sapucais en esta ventana: alcanza con
    // mostrar la confirmación. El foco es que la transcripción real funcione.
    setIsEnviado(true)
  }

  if (isEnviado) {
    return (
      <div className="min-h-screen bg-blanco-cosido font-body text-tinta flex flex-col items-center">
        <div className="w-full max-w-[420px] bg-blanco-cosido min-h-screen relative shadow-2xl flex flex-col items-center justify-center p-6 text-center">
          <CheckCircle2 size={80} className="text-verde-bandera mb-6" />
          <h1 className="text-2xl font-bold t-display uppercase tracking-wider mb-4">¡Tu Sapucai fue enviado!</h1>
          <p className="text-tinta-tenue mb-12 text-lg">La IA lo está procesando. Te avisaremos cuando haya novedades.</p>
          <button
            onClick={() => router.push(`/detalle/${id}`)}
            className="w-full bg-indigo-campo text-blanco-cosido sombra-boton py-4 rounded-full font-bold uppercase tracking-widest hover:opacity-90"
          >
            Entendido
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blanco-cosido font-body text-tinta flex flex-col items-center">
      <div className="w-full max-w-[420px] bg-blanco-cosido min-h-screen relative shadow-2xl flex flex-col">

        {/* Header */}
        <header className="px-6 py-4 flex items-center relative border-b border-hilo">
          <button onClick={() => router.back()} className="text-tinta absolute left-6">
            <ChevronLeft size={24} />
          </button>
          <h1 className="flex-1 text-center font-bold text-tinta">Grabar Sapucai</h1>
        </header>

        <main className="flex-1 flex flex-col items-center p-6 pt-12">
          <h2 className="text-center font-bold text-xl mb-2">
            Hablá cuando quieras,
          </h2>
          <p className="text-center text-tinta-tenue mb-12">
            tenés hasta 15 segundos.
          </p>

          <Grabador onEnviar={handleEnviar} />
        </main>

        {/* Footer */}
        <div className="p-6">
          <button
            onClick={() => router.back()}
            className="w-full border border-indigo-campo py-4 rounded-full font-bold uppercase tracking-widest text-indigo-campo hover:bg-lienzo"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
