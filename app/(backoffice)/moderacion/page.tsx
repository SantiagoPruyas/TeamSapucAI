'use client'

import React, { useState } from 'react'
import { TablaModeracion } from '@/components/backoffice/TablaModeracion'
import { Filter } from 'lucide-react'

const TABS: { id: 'pendientes' | 'aprobados' | 'ocultos'; label: string; count?: number }[] = [
  { id: 'pendientes', label: 'Pendientes', count: 6 },
  { id: 'aprobados', label: 'Aprobados' },
  { id: 'ocultos', label: 'Ocultos' },
]

export default function ModeracionPage() {
  const [tab, setTab] = useState<'pendientes' | 'aprobados' | 'ocultos'>('pendientes')

  return (
    <div className="bg-lienzo-hueso min-h-screen">
      <div className="border-b border-hilo px-8 py-6 flex items-center justify-between gap-4 flex-wrap">
        <h1 className="t-headline text-indigo-campo">Moderación de sapucais</h1>
        <button className="flex items-center gap-2 border border-hilo text-indigo-campo rounded-full px-4 py-2 t-label hover:bg-lienzo transition-colors sombra-suave">
          <Filter size={16} /> Filtros
        </button>
      </div>

      <div className="p-8">
        <div className="flex gap-2 mb-6">
          {TABS.map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-full t-label transition-colors ${
                tab === id
                  ? 'bg-indigo-campo text-blanco-cosido sombra-boton'
                  : 'text-tinta-tenue hover:bg-lienzo'
              }`}
            >
              {label}{typeof count === 'number' ? ` (${count})` : ''}
            </button>
          ))}
        </div>

        <div className="tarjeta-blanca p-0 overflow-x-auto">
          <TablaModeracion filtro={tab} />
        </div>
      </div>
    </div>
  )
}
