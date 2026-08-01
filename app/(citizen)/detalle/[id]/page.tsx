'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, Share2, Mic } from 'lucide-react'
import Link from 'next/link'

export default function DetallePropuestaMockup() {
  const router = useRouter()
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-[#FBFAF7] font-body text-[#14181F] flex flex-col items-center">
      <div className="w-full max-w-[420px] bg-white min-h-screen relative shadow-2xl flex flex-col">
        
        {/* Header */}
        <header className="px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.back()} className="text-gray-900">
            <ChevronLeft size={24} />
          </button>
          <button className="text-gray-900">
            <Share2 size={20} />
          </button>
        </header>

        <main className="flex-1 px-6 pb-32 overflow-y-auto">
          {/* Categoria */}
          <div className="bg-[#1E6B45]/10 text-[#1E6B45] inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Salud
          </div>

          <h1 className="text-2xl font-bold font-display uppercase tracking-wider leading-tight mb-6 text-[#14181F]">
            Proyecto de Ley para la Promoción de la Salud Mental en Escuelas
          </h1>

          <div className="bg-[#F2F9F9] rounded-lg p-5 mb-6 border border-[#E0F2F1]">
            <h2 className="font-bold text-teal-800 mb-2">Resumen en lenguaje llano</h2>
            <p className="text-teal-900 text-sm leading-relaxed mb-3">
              Busca que todas las escuelas tengan programas de prevención y acompañamiento psicológico para estudiantes y familias. Se capacitará a docentes y se trabajará en conjunto con centros de salud.
            </p>
            <button className="text-teal-700 font-bold text-sm hover:underline">
              Leer texto completo
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-5 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-gray-900">Respuesta del diputado</h2>
              <span className="text-xs text-gray-500">26/05/2026</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Muchas gracias por sus opiniones. Coincidimos en la importancia de la salud mental en nuestras escuelas...
            </p>
            <button className="text-[#17264A] font-bold text-sm hover:underline flex items-center gap-1">
              Leer completa &rarr;
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 text-center">
            <h3 className="font-bold text-gray-900 mb-1">¿Tenés dudas?</h3>
            <p className="text-gray-600 text-sm">Preguntale a la IA sobre esta propuesta</p>
          </div>
        </main>

        {/* Footer sticky */}
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-white via-white to-transparent pt-12">
          <Link href={`/grabar/${id}`} className="bg-[#17264A] w-full text-white rounded-full py-4 px-6 flex items-center justify-center gap-3 shadow-lg hover:bg-blue-900">
            <Mic size={24} />
            <div className="text-left">
              <div className="font-display font-bold uppercase tracking-widest text-sm">Dar mi sapucai</div>
              <div className="text-xs text-gray-300">Hablá hasta 15 segundos</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
