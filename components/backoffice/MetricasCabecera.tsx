import React from 'react'

interface MetricasCabeceraProps {
  totalSapucais: number
  participacionPorcentaje: number
  pendientesAnalisis: number
  esMock?: boolean
}

export function MetricasCabecera({
  totalSapucais,
  participacionPorcentaje,
  pendientesAnalisis,
  esMock = false
}: MetricasCabeceraProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <h2 className="text-[#FBFAF7] font-display uppercase tracking-wider text-sm font-bold">Resumen de Impacto</h2>
        {esMock && (
          <span className="bg-[#A82418] text-[#FBFAF7] px-2 py-1 rounded-sm text-[11px] font-display uppercase tracking-widest font-bold">
            Datos de demostración
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#EFEBE2] border-l-[3px] border-[#17264A] p-4 rounded-sm flex flex-col justify-between">
          <span className="text-[#5A6472] font-display uppercase text-xs tracking-widest font-bold">Total Sapucais</span>
          <span className="text-3xl font-body font-bold text-[#14181F] tabular-nums leading-none mt-2">{totalSapucais}</span>
        </div>
        
        <div className="bg-[#EFEBE2] border-l-[3px] border-[#1E6B45] p-4 rounded-sm flex flex-col justify-between">
          <span className="text-[#5A6472] font-display uppercase text-xs tracking-widest font-bold">Participación</span>
          <span className="text-3xl font-body font-bold text-[#14181F] tabular-nums leading-none mt-2">{participacionPorcentaje}%</span>
        </div>

        <div className="bg-[#EFEBE2] border-l-[3px] border-[#C89A3C] p-4 rounded-sm flex flex-col justify-between">
          <span className="text-[#5A6472] font-display uppercase text-xs tracking-widest font-bold">Por Analizar</span>
          <span className="text-3xl font-body font-bold text-[#14181F] tabular-nums leading-none mt-2">{pendientesAnalisis}</span>
        </div>
      </div>
    </div>
  )
}
