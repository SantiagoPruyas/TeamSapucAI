import React from 'react'
import { Argumento, Postura } from '@/lib/types'
import { Bot, Users } from 'lucide-react'

interface ArgumentosAgrupadosProps {
  argumentos: Argumento[] | null
  totalSapucais: number
  onAgrupar: () => void
  isAgrupando: boolean
}

const posturaColors: Record<Postura, { borde: string, texto: string, bg: string, label: string }> = {
  a_favor: { borde: 'border-[#1E6B45]', texto: 'text-[#1E6B45]', bg: 'bg-[#1E6B45]', label: 'A Favor' },
  en_contra: { borde: 'border-[#A82418]', texto: 'text-[#A82418]', bg: 'bg-[#A82418]', label: 'En Contra' },
  neutro: { borde: 'border-[#77808F]', texto: 'text-[#77808F]', bg: 'bg-[#77808F]', label: 'Neutro' }
}

export function ArgumentosAgrupados({ argumentos, totalSapucais, onAgrupar, isAgrupando }: ArgumentosAgrupadosProps) {
  if (totalSapucais === 0) {
    return (
      <div className="bg-[#EFEBE2] border-l-[3px] border-[#17264A] p-8 rounded-sm shadow-sm text-center">
        <Users size={48} className="text-[#5A6472] mx-auto mb-4 opacity-50" />
        <h2 className="text-[#14181F] font-display uppercase tracking-wider text-xl font-bold mb-2">
          Sin participación
        </h2>
        <p className="text-[#5A6472] font-body">
          Aún no hay ciudadanos participando en esta propuesta. Vuelve más tarde.
        </p>
      </div>
    )
  }

  if (!argumentos) {
    return (
      <div className="bg-[#EFEBE2] border-l-[3px] border-[#17264A] p-8 rounded-sm shadow-sm text-center">
        <Bot size={48} className="text-[#17264A] mx-auto mb-4" />
        <h2 className="text-[#14181F] font-display uppercase tracking-wider text-xl font-bold mb-2">
          Análisis de argumentos pendiente
        </h2>
        <p className="text-[#5A6472] font-body mb-6 max-w-md mx-auto">
          Hay {totalSapucais} sapucais listos para ser procesados. La IA puede agrupar las posturas y extraer los argumentos principales para ahorrarte tiempo de lectura.
        </p>
        <button
          onClick={onAgrupar}
          disabled={isAgrupando}
          className="bg-[#17264A] disabled:opacity-50 hover:bg-[#0D1730] text-[#FBFAF7] font-body font-semibold px-6 py-2.5 rounded transition-colors inline-flex items-center gap-2"
        >
          {isAgrupando ? (
            <>
              <Bot className="animate-pulse text-[#C89A3C]" size={18} />
              Procesando argumentos...
            </>
          ) : (
            <>
              <Bot size={18} />
              Agrupar argumentos con IA
            </>
          )}
        </button>
      </div>
    )
  }

  // Ordenar por cantidad descendente
  const ordenados = [...argumentos].sort((a, b) => b.personas - a.personas)

  return (
    <div className="space-y-4 relative">
      {isAgrupando && (
         <div className="absolute inset-0 bg-[#0D1730]/60 backdrop-blur-[1px] flex items-center justify-center rounded z-10">
           <div className="bg-[#17264A] text-[#FBFAF7] px-6 py-4 rounded shadow flex items-center gap-4">
             <Bot className="animate-pulse text-[#C89A3C]" />
             <span className="font-body font-semibold">La IA está procesando los argumentos...</span>
           </div>
         </div>
      )}

      {ordenados.map((arg, idx) => {
        const config = posturaColors[arg.postura]
        return (
          <div key={idx} className={`bg-[#EFEBE2] border-l-[3px] ${config.borde} p-6 rounded-sm shadow-sm flex flex-col md:flex-row md:items-center gap-6 justify-between`}>
            <div className="flex-1">
              <span className={`font-display uppercase tracking-widest text-xs font-bold ${config.texto} mb-1 block`}>
                {config.label}
              </span>
              <p className="font-body text-[#14181F] text-lg leading-relaxed">
                "{arg.texto}"
              </p>
            </div>
            
            <div className="flex items-center gap-3 md:flex-col md:gap-1 text-right shrink-0">
              <span className="text-4xl font-body font-bold text-[#14181F] tabular-nums leading-none">
                {arg.personas}
              </span>
              <span className="text-sm font-display uppercase tracking-widest font-semibold text-[#5A6472]">
                Personas
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
