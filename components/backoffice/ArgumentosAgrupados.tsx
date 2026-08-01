import React from 'react'
import { Argumento } from '@/lib/types'

interface ArgumentosAgrupadosProps {
  argumentos: Argumento[] | null
  totalSapucais: number
  onAgrupar: () => void
  isAgrupando: boolean
}

const colorPostura: Record<Argumento['postura'], string> = {
  a_favor: 'var(--verde-bandera)',
  en_contra: 'var(--cochinilla)',
  neutro: 'var(--gris-pizarra)'
}

const labelPostura: Record<Argumento['postura'], string> = {
  a_favor: 'A favor',
  en_contra: 'En contra',
  neutro: 'Neutro'
}

export function ArgumentosAgrupados({ argumentos, totalSapucais, onAgrupar, isAgrupando }: ArgumentosAgrupadosProps) {
  if (!argumentos || totalSapucais === 0) {
    return (
      <div className="tarjeta-blanca p-6 flex flex-col h-full items-center justify-center text-center gap-4">
        <h2 className="t-title text-tinta">Argumentos principales (IA)</h2>
        <button
          onClick={onAgrupar}
          disabled={isAgrupando}
          className="t-label text-indigo-campo hover:underline disabled:opacity-60"
        >
          {isAgrupando ? 'Procesando...' : 'Ver todos los argumentos'}
        </button>
      </div>
    )
  }

  const ordenados = [...argumentos].sort((a, b) => b.personas - a.personas)
  const maxPersonas = ordenados.reduce((acc, a) => acc + a.personas, 0) || 1

  return (
    <div className="tarjeta-blanca p-6 flex flex-col h-full">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="t-title text-tinta">Argumentos principales (IA)</h2>
        <span className="t-label text-tinta-tenue">datos de demostración</span>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {ordenados.map((arg, idx) => {
          const pct = Math.round((arg.personas / maxPersonas) * 100)
          return (
            <div
              key={idx}
              className="tarjeta-blanca border-l-[3px] p-4 flex items-center gap-3"
              style={{ borderLeftColor: colorPostura[arg.postura] }}
            >
              <span className="t-data text-tinta-tenue w-5">{idx + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="t-body text-tinta line-clamp-2">{arg.texto}</p>
                <span className="t-label text-tinta-tenue">{labelPostura[arg.postura]} · {arg.personas} personas</span>
              </div>
              <span className="t-data text-tinta w-12 text-right shrink-0">{pct}%</span>
            </div>
          )
        })}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={onAgrupar}
          disabled={isAgrupando}
          className="t-label text-indigo-campo hover:underline disabled:opacity-60"
        >
          {isAgrupando ? 'Procesando...' : 'Volver a agrupar argumentos'}
        </button>
      </div>
    </div>
  )
}
