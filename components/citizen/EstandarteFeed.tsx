import React from 'react'
import { Propuesta, Interes } from '@/lib/types'
import { CheckCircle2, MessageSquare } from 'lucide-react'
import { IconoInteres } from '@/components/ui/icono-interes'

// El tipo extendido que devolvemos en nuestro mock
type PropuestaFeed = Propuesta & { interesesDetalle?: Interes[] }

interface EstandarteFeedProps {
  propuesta: PropuestaFeed
  destacado?: boolean
}

export function EstandarteFeed({ propuesta, destacado = false }: EstandarteFeedProps) {
  const {
    titulo,
    resumenIa,
    estado,
    totalSapucais,
    tieneRespuesta,
    termometro,
    interesesDetalle = []
  } = propuesta

  const total = termometro.aFavor + termometro.enContra + termometro.neutro
  const pctFavor = total > 0 ? (termometro.aFavor / total) * 100 : 0
  const pctContra = total > 0 ? (termometro.enContra / total) * 100 : 0
  const pctNeutro = total > 0 ? 100 - pctFavor - pctContra : 0

  return (
    <div className={`tarjeta-blanca overflow-hidden relative ${destacado ? 'mb-8' : 'mb-4'} ${estado === 'cerrada' ? 'opacity-70' : ''}`}>

      {/* Insignias y Estado superior */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-wrap gap-1.5">
          {interesesDetalle.map(i => (
            <div key={i.id} className="bg-lienzo border border-hilo px-2 py-0.5 rounded-[14px] flex items-center gap-1">
              <IconoInteres nombre={i.icono} size={12} className="text-tinta-tenue" aria-hidden />
              <span className="t-label text-tinta">{i.nombre}</span>
            </div>
          ))}
        </div>
        {estado === 'cerrada' && (
          <span className="bg-gris-pizarra text-blanco-cosido px-2 py-0.5 rounded-[14px] t-label">
            Cerrada
          </span>
        )}
      </div>

      {/* Título */}
      <h2 className={`${destacado ? 'text-2xl md:text-3xl' : 'text-xl'} font-display font-bold uppercase tracking-wider text-tinta leading-tight mb-3 line-clamp-3`}>
        {titulo}
      </h2>

      {/* Resumen */}
      {resumenIa ? (
        <p className="t-body text-tinta text-sm leading-relaxed line-clamp-2 mb-4">
          {resumenIa}
        </p>
      ) : (
        <p className="t-body text-tinta-tenue italic text-sm mb-4">
          Pendiente de análisis...
        </p>
      )}

      {/* Termómetro (Solo Destacado) */}
      {destacado && estado !== 'procesando' && (
        <div className="mb-4">
          <p className="t-label text-tinta-tenue mb-1">
            Pulso actual
          </p>
          <div className="h-4 w-full flex bg-hilo rounded-full overflow-hidden">
            {total === 0 ? (
              <div className="h-full bg-hilo w-full" />
            ) : (
              <>
                <div className="h-full bg-verde-bandera" style={{ width: `${pctFavor}%` }} />
                <div className="h-full bg-cochinilla" style={{ width: `${pctContra}%` }} />
                <div className="h-full bg-gris-pizarra" style={{ width: `${pctNeutro}%` }} />
              </>
            )}
          </div>
        </div>
      )}

      {/* Pie: Métricas y Sello */}
      <div className="flex items-center justify-between pt-3 border-t border-hilo mt-auto">
        <div className="flex items-center gap-2 text-tinta-tenue">
          <MessageSquare size={14} />
          <span className="t-data text-xs">{totalSapucais} sapucais</span>
        </div>

        {tieneRespuesta && (
          <div className="flex items-center gap-1 text-verde-bandera">
            <CheckCircle2 size={14} />
            <span className="t-label">
              El diputado respondió
            </span>
          </div>
        )}
      </div>

    </div>
  )
}
