import React from 'react'
import { Argumento } from '@/lib/types'

interface ArgumentosAgrupadosProps {
  argumentos: Argumento[] | null
  totalSapucais: number
  onAgrupar: () => void
  isAgrupando: boolean
}

export function ArgumentosAgrupados({ argumentos, totalSapucais, onAgrupar, isAgrupando }: ArgumentosAgrupadosProps) {
  if (!argumentos || totalSapucais === 0) {
    return (
      <div className="bg-white border border-gray-100 p-6 rounded shadow-sm text-center">
        <h2 className="text-gray-900 font-bold mb-2">Argumentos principales (IA)</h2>
        <button
          onClick={onAgrupar}
          disabled={isAgrupando}
          className="text-sm text-blue-600 font-bold hover:underline"
        >
          {isAgrupando ? "Procesando..." : "Ver todos los argumentos"}
        </button>
      </div>
    )
  }

  const ordenados = [...argumentos].sort((a, b) => b.personas - a.personas)
  const maxPersonas = ordenados.reduce((acc, a) => acc + a.personas, 0) || 1

  return (
    <div className="bg-white border border-gray-100 p-6 rounded shadow-sm flex flex-col h-full">
      <h2 className="text-gray-900 font-bold mb-4">Argumentos principales (IA)</h2>
      
      <div className="flex flex-col gap-4 flex-1">
        {ordenados.map((arg, idx) => {
          const pct = Math.round((arg.personas / maxPersonas) * 100)
          return (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-gray-400 font-bold text-sm w-4">{idx + 1}</span>
              <p className="flex-1 text-sm text-gray-800 line-clamp-1">{arg.texto}</p>
              <span className="text-sm font-bold text-gray-800 w-10 text-right">{pct}%</span>
            </div>
          )
        })}
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 font-bold hover:underline">
          Ver todos los argumentos
        </button>
      </div>
    </div>
  )
}
