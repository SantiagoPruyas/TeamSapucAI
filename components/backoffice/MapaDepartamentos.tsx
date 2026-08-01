import React from 'react'
import { MapPin } from 'lucide-react'
import { sapucais } from '@/lib/mock/data'

interface MapaDepartamentosProps {
  propuestaId?: string
}

export function MapaDepartamentos({ propuestaId }: MapaDepartamentosProps) {
  const relevantes = propuestaId ? sapucais.filter(s => s.propuestaId === propuestaId) : sapucais

  const conteoPorDepto = relevantes.reduce<Record<string, number>>((acc, s) => {
    acc[s.autor.departamento] = (acc[s.autor.departamento] || 0) + 1
    return acc
  }, {})

  const ranking = Object.entries(conteoPorDepto)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  const maxConteo = ranking[0]?.[1] || 1

  return (
    <div className="tarjeta-blanca p-6 flex flex-col h-full">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="t-title text-tinta">Opinión por departamento</h2>
        <span className="t-label text-tinta-tenue">datos de demostración</span>
      </div>

      {ranking.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 opacity-70">
          <MapPin size={40} className="text-tinta-tenue" />
          <p className="t-body text-tinta-tenue">Sin sapucais registrados todavía.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 flex-1">
          {ranking.map(([depto, count]) => (
            <div key={depto} className="flex items-center gap-3">
              <span className="t-body text-tinta w-40 truncate">{depto}</span>
              <div className="flex-1 h-3 bg-hilo/40 rounded-sm overflow-hidden">
                <div
                  className="h-full bg-indigo-campo rounded-sm"
                  style={{ width: `${Math.round((count / maxConteo) * 100)}%` }}
                />
              </div>
              <span className="t-data text-tinta w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
