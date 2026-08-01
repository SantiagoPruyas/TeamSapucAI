import React from 'react'
import { Interes } from '@/lib/types'
import { IconoInteres } from '@/components/ui/icono-interes'

interface ResumenPropuestaProps {
  titulo: string
  resumen: string | null
  intereses: Interes[]
}

export function ResumenPropuesta({ titulo, resumen, intereses }: ResumenPropuestaProps) {
  return (
    <div className="tarjeta-blanca p-6 relative">
      <div className="mb-4">
        <h1 className="t-headline text-tinta leading-[0.95]">
          {titulo}
        </h1>
      </div>

      {intereses.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {intereses.map(interes => (
            <div key={interes.id} className="flex items-center gap-1.5 bg-lienzo px-2.5 py-1 rounded-full border border-hilo">
              <IconoInteres nombre={interes.icono} size={14} className="text-tinta-tenue" aria-hidden />
              <span className="t-label text-tinta">
                {interes.nombre}
              </span>
            </div>
          ))}
        </div>
      )}

      <div>
        <h3 className="t-label text-tinta-tenue mb-2">
          Resumen (En Criollo)
        </h3>
        <p className="t-body text-tinta max-w-[68ch]">
          {resumen || 'Esta propuesta aún no tiene un resumen generado.'}
        </p>
      </div>
    </div>
  )
}
