'use client'

import React, { useState } from 'react'
import { TablaModeracion } from '@/components/backoffice/TablaModeracion'
import { Filter } from 'lucide-react'

export default function ModeracionPage() {
  const [tab, setTab] = useState<'pendientes' | 'aprobados' | 'ocultos'>('pendientes')

  return (
    <div className="bg-[#FBFAF7] min-h-screen">
      <div className="border-b px-8 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold font-display uppercase tracking-widest text-[#14181F]">
          MODERACIÓN DE SAPUCAIS
        </h1>
        <button className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 text-sm font-semibold hover:bg-gray-50 text-gray-700 bg-white">
          <Filter size={16} /> Filtros
        </button>
      </div>
      
      <div className="p-8">
        <div className="flex gap-6 border-b border-gray-200 mb-6 font-semibold text-sm">
          <button 
            className={`pb-3 border-b-2 ${tab === 'pendientes' ? 'border-[#17264A] text-[#17264A]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setTab('pendientes')}
          >
            Pendientes (6)
          </button>
          <button 
            className={`pb-3 border-b-2 ${tab === 'aprobados' ? 'border-[#17264A] text-[#17264A]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setTab('aprobados')}
          >
            Aprobados
          </button>
          <button 
            className={`pb-3 border-b-2 ${tab === 'ocultos' ? 'border-[#17264A] text-[#17264A]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setTab('ocultos')}
          >
            Ocultos
          </button>
        </div>

        <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
          <TablaModeracion filtro={tab} />
        </div>
      </div>
    </div>
  )
}
