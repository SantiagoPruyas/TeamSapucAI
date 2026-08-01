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
    <div className="tarjeta-blanca p-6 flex flex-col h-full">
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="t-title text-tinta">Termómetro de opinión</h2>
        <span className="t-label text-tinta-tenue">datos de demostración</span>
      </div>
      <p className="t-body text-tinta-tenue mb-6">
        Total de Sapucais: <span className="t-data">{total}</span>
      </p>

      {total === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="t-body text-tinta-tenue">Todavía no hay sapucais para esta propuesta.</p>
        </div>
      ) : (
        <>
          {/* Campo Dividido: barra con bordes duros entre segmentos, sin degradé */}
          <div className="flex w-full h-16 rounded-sm overflow-hidden border-2 border-indigo-campo">
            {pctFavor > 0 && (
              <div
                className="h-full flex items-center justify-center border-r-2 border-indigo-campo last:border-r-0 overflow-hidden"
                style={{ width: `${pctFavor}%`, backgroundColor: 'var(--verde-bandera)' }}
              >
                {pctFavor >= 8 && <span className="t-data text-blanco-cosido text-lg whitespace-nowrap">{pctFavor}%</span>}
              </div>
            )}
            {pctContra > 0 && (
              <div
                className="h-full flex items-center justify-center border-r-2 border-indigo-campo last:border-r-0 overflow-hidden"
                style={{ width: `${pctContra}%`, backgroundColor: 'var(--cochinilla)' }}
              >
                {pctContra >= 8 && <span className="t-data text-blanco-cosido text-lg whitespace-nowrap">{pctContra}%</span>}
              </div>
            )}
            {pctNeutro > 0 && (
              <div
                className="h-full flex items-center justify-center overflow-hidden"
                style={{ width: `${pctNeutro}%`, backgroundColor: 'var(--gris-pizarra)' }}
              >
                {pctNeutro >= 8 && <span className="t-data text-blanco-cosido text-lg whitespace-nowrap">{pctNeutro}%</span>}
              </div>
            )}
          </div>

          <div className="flex items-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--verde-bandera)' }} />
              <span className="t-body text-tinta">A favor</span>
              <span className="t-data text-tinta">{pctFavor}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--cochinilla)' }} />
              <span className="t-body text-tinta">En contra</span>
              <span className="t-data text-tinta">{pctContra}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--gris-pizarra)' }} />
              <span className="t-body text-tinta">Neutro</span>
              <span className="t-data text-tinta">{pctNeutro}%</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
