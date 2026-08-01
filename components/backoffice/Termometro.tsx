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
  const pctNeutro = total > 0 ? 100 - pctFavor - pctContra : 0

  return (
    <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex flex-col h-full">
      <h2 className="text-gray-900 font-bold mb-1">Termómetro de opinión</h2>
      <p className="text-gray-500 text-sm font-semibold mb-6">Total de Sapucais: {total}</p>

      <div className="flex items-center justify-between flex-1">
        {/* Simple CSS Donut Chart */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            {/* Neutro */}
            <circle
              stroke="#77808F"
              strokeWidth="8"
              fill="transparent"
              r="14"
              cx="18"
              cy="18"
              strokeDasharray={`${pctNeutro} ${100 - pctNeutro}`}
              strokeDashoffset="0"
            />
            {/* A Favor */}
            <circle
              stroke="#1E6B45"
              strokeWidth="8"
              fill="transparent"
              r="14"
              cx="18"
              cy="18"
              strokeDasharray={`${pctFavor} ${100 - pctFavor}`}
              strokeDashoffset={`-${pctNeutro}`}
            />
            {/* En Contra */}
            <circle
              stroke="#A82418"
              strokeWidth="8"
              fill="transparent"
              r="14"
              cx="18"
              cy="18"
              strokeDasharray={`${pctContra} ${100 - pctContra}`}
              strokeDashoffset={`-${pctNeutro + pctFavor}`}
            />
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#A82418]"></div>
            <span className="text-sm font-bold text-gray-800">{pctContra}%</span>
            <span className="text-sm text-gray-500">En contra</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#1E6B45]"></div>
            <span className="text-sm font-bold text-gray-800">{pctFavor}%</span>
            <span className="text-sm text-gray-500">A favor</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#77808F]"></div>
            <span className="text-sm font-bold text-gray-800">{pctNeutro}%</span>
            <span className="text-sm text-gray-500">Neutro</span>
          </div>
        </div>
      </div>
    </div>
  )
}
