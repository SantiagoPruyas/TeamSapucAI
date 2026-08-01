import React from 'react'
import { Propuesta, Interes } from '@/lib/types'
import { CheckCircle2, MessageSquare } from 'lucide-react'

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
    <div className={`bg-[#EFEBE2] rounded-sm shadow-md overflow-hidden relative ${destacado ? 'mb-8' : 'mb-4'}`}>
      {/* Banda de izada */}
      <div className="w-full h-1.5 bg-[#0D1730] flex items-center px-4">
        <div className="w-1 h-1 rounded-full bg-[#EFEBE2] ml-1 opacity-50"></div>
        <div className="w-1 h-1 rounded-full bg-[#EFEBE2] ml-2 opacity-50"></div>
      </div>

      <div className={`p-4 md:p-6 ${estado === 'cerrada' ? 'opacity-70' : ''}`}>
        
        {/* Insignias y Estado superior */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-wrap gap-1.5">
            {interesesDetalle.map(i => (
              <div key={i.id} className="bg-[#FBFAF7] border border-[#D6CFC0] px-2 py-0.5 rounded-sm flex items-center gap-1">
                <span>{i.icono}</span>
                <span className="font-display uppercase tracking-widest text-[10px] font-bold text-[#14181F]">{i.nombre}</span>
              </div>
            ))}
          </div>
          {estado === 'cerrada' && (
            <span className="bg-[#5A6472] text-[#FBFAF7] px-2 py-0.5 rounded-sm font-display uppercase tracking-widest text-[10px] font-bold">
              Cerrada
            </span>
          )}
        </div>

        {/* Título */}
        <h2 className={`${destacado ? 'text-2xl md:text-3xl' : 'text-xl'} font-display font-bold uppercase tracking-wider text-[#14181F] leading-tight mb-3 line-clamp-3`}>
          {titulo}
        </h2>

        {/* Resumen */}
        {resumenIa ? (
          <p className="font-body text-[#14181F] text-sm leading-relaxed line-clamp-2 mb-4">
            {resumenIa}
          </p>
        ) : (
          <p className="font-body text-[#77808F] italic text-sm mb-4">
            Pendiente de análisis...
          </p>
        )}

        {/* Termómetro (Solo Destacado) */}
        {destacado && estado !== 'procesando' && (
          <div className="mb-4">
            <p className="font-display uppercase tracking-widest text-[10px] font-bold text-[#5A6472] mb-1">
              Pulso actual
            </p>
            <div className="h-4 w-full flex bg-[#77808F] rounded-sm overflow-hidden shadow-inner">
              {total === 0 ? (
                <div className="h-full bg-[#D6CFC0] w-full" />
              ) : (
                <>
                  <div className="h-full bg-[#1E6B45]" style={{ width: `${pctFavor}%` }} />
                  <div className="h-full bg-[#A82418]" style={{ width: `${pctContra}%` }} />
                  <div className="h-full bg-[#77808F]" style={{ width: `${pctNeutro}%` }} />
                </>
              )}
            </div>
          </div>
        )}

        {/* Pie: Métricas y Sello */}
        <div className="flex items-center justify-between pt-3 border-t border-[#D6CFC0]/50 mt-auto">
          <div className="flex items-center gap-2 text-[#5A6472]">
            <MessageSquare size={14} />
            <span className="font-body text-xs font-semibold tabular-nums">{totalSapucais} sapucais</span>
          </div>
          
          {tieneRespuesta && (
            <div className="flex items-center gap-1 text-[#1E6B45]">
              <CheckCircle2 size={14} />
              <span className="font-display uppercase tracking-widest text-[10px] font-bold">
                El diputado respondió
              </span>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}
