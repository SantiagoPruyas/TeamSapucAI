import React from 'react'
import { Interes } from '@/lib/types'

interface ResumenPropuestaProps {
  titulo: string
  resumen: string | null
  intereses: Interes[]
}

export function ResumenPropuesta({ titulo, resumen, intereses }: ResumenPropuestaProps) {
  return (
    <div className="bg-[#EFEBE2] border-l-[3px] border-[#17264A] p-6 rounded-sm shadow-sm relative">
      {/* Banda de izada (detallito del diseño) */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#0D1730] rounded-t-sm flex items-center px-6">
        <div className="w-1.5 h-1.5 rounded-full bg-[#EFEBE2] ml-2 opacity-50"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#EFEBE2] ml-4 opacity-50"></div>
      </div>

      <div className="mt-4 mb-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-wider text-[#14181F] leading-[0.95]">
          {titulo}
        </h1>
      </div>

      {intereses.length > 0 && (
        <div className="flex gap-2 mb-6">
          {intereses.map(interes => (
            <div key={interes.id} className="flex items-center gap-1.5 bg-[#F7F5F0] px-2.5 py-1 rounded-sm border border-[#D6CFC0]">
              <span>{interes.icono}</span>
              <span className="font-display uppercase tracking-widest text-[11px] font-semibold text-[#14181F]">
                {interes.nombre}
              </span>
            </div>
          ))}
        </div>
      )}

      <div>
        <h3 className="font-display uppercase tracking-widest text-xs font-bold text-[#5A6472] mb-2">
          Resumen (En Criollo)
        </h3>
        <p className="font-body text-[#14181F] text-base lg:text-lg leading-relaxed max-w-[68ch]">
          {resumen || "Esta propuesta aún no tiene un resumen generado."}
        </p>
      </div>
    </div>
  )
}
