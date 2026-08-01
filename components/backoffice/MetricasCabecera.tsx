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
        <h2 className="t-label text-indigo-campo">Resumen de Impacto</h2>
        {esMock && (
          <span className="bg-cochinilla text-blanco-cosido px-2 py-1 rounded-full t-label">
            Datos de demostración
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="tarjeta-blanca p-4 flex flex-col justify-between">
          <span className="t-label text-tinta-tenue">Total Sapucais</span>
          <span className="t-data text-3xl text-tinta leading-none mt-2">{totalSapucais}</span>
        </div>

        <div className="tarjeta-blanca border-l-[3px] p-4 flex flex-col justify-between" style={{ borderLeftColor: 'var(--verde-bandera)' }}>
          <span className="t-label text-tinta-tenue">Participación</span>
          <span className="t-data text-3xl text-tinta leading-none mt-2">{participacionPorcentaje}%</span>
        </div>

        <div className="tarjeta-blanca border-l-[3px] p-4 flex flex-col justify-between" style={{ borderLeftColor: 'var(--oro-filete)' }}>
          <span className="t-label text-tinta-tenue">Por Analizar</span>
          <span className="t-data text-3xl text-tinta leading-none mt-2">{pendientesAnalisis}</span>
        </div>
      </div>
    </div>
  )
}
