import React from 'react'

interface TermometroProps {
  aFavor: number
  enContra: number
  neutro: number
}

export function Termometro({ aFavor, enContra, neutro }: TermometroProps) {
  const total = aFavor + enContra + neutro

  const pctFavor = total > 0 ? Math.round((aFavor / total) * 100) : 0
  const pctContra = total > 0 ? Math.round((enContra / total) * 100) : 0
  const pctNeutro = total > 0 ? 100 - pctFavor - pctContra : 0 // Ajuste fino para sumar 100

  return (
    <div className="bg-[#EFEBE2] p-8 rounded-sm shadow-sm">
      <h2 className="text-[#14181F] font-display uppercase tracking-wider text-xl font-bold mb-6">
        Termómetro de Posturas
      </h2>

      {/* La Barra (división heráldica) */}
      <div className="h-16 w-full flex bg-[#77808F] overflow-hidden rounded-sm mb-6 shadow-inner">
        {total === 0 ? (
          <div className="h-full bg-[#D6CFC0] w-full" />
        ) : (
          <>
            <div 
              className="h-full bg-[#1E6B45] transition-all duration-1000 border-r border-[#EFEBE2]" 
              style={{ width: `${pctFavor}%` }} 
            />
            <div 
              className="h-full bg-[#A82418] transition-all duration-1000 border-r border-[#EFEBE2]" 
              style={{ width: `${pctContra}%` }} 
            />
            <div 
              className="h-full bg-[#77808F] transition-all duration-1000" 
              style={{ width: `${pctNeutro}%` }} 
            />
          </>
        )}
      </div>

      {/* Los Números */}
      <div className="grid grid-cols-3 gap-8">
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl font-body font-bold text-[#1E6B45] tabular-nums">{total === 0 ? '-' : pctFavor}%</span>
            <span className="text-xl font-body text-[#5A6472] tabular-nums">({aFavor})</span>
          </div>
          <span className="font-display uppercase tracking-widest text-sm font-bold text-[#1E6B45]">A Favor</span>
        </div>

        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl font-body font-bold text-[#A82418] tabular-nums">{total === 0 ? '-' : pctContra}%</span>
            <span className="text-xl font-body text-[#5A6472] tabular-nums">({enContra})</span>
          </div>
          <span className="font-display uppercase tracking-widest text-sm font-bold text-[#A82418]">En Contra</span>
        </div>

        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl font-body font-bold text-[#77808F] tabular-nums">{total === 0 ? '-' : pctNeutro}%</span>
            <span className="text-xl font-body text-[#5A6472] tabular-nums">({neutro})</span>
          </div>
          <span className="font-display uppercase tracking-widest text-sm font-bold text-[#77808F]">Neutro</span>
        </div>
      </div>
    </div>
  )
}
