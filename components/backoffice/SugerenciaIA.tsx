import React from 'react'
import { intereses } from '@/lib/mock/data'
import { Sparkles } from 'lucide-react'
import { IconoInteres } from '@/components/ui/icono-interes'

interface SugerenciaIAProps {
  resumen: string
  onResumenChange: (v: string) => void
  interesesSugeridos: string[]
  onAceptar: () => void
  onDescartar: () => void
}

export function SugerenciaIA({
  resumen,
  onResumenChange,
  interesesSugeridos,
  onAceptar,
  onDescartar
}: SugerenciaIAProps) {
  // Convertimos los IDs sugeridos a los objetos completos del catálogo
  const categorias = intereses.filter(i => interesesSugeridos.includes(i.id))

  return (
    <div className="tarjeta-blanca p-6 border-l-[3px]" style={{ borderLeftColor: 'var(--oro-filete)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} className="text-oro-filete" aria-hidden />
        <span className="t-label text-oro-filete">Sugerido por IA</span>
      </div>

      <div className="mb-6">
        <label className="block t-label text-tinta-tenue mb-2">Resumen para el ciudadano</label>
        <textarea
          value={resumen}
          onChange={(e) => onResumenChange(e.target.value)}
          className="w-full bg-lienzo text-tinta p-4 rounded-2xl t-body border border-hilo focus:ring-1 focus:ring-oro-filete outline-none resize-y min-h-[120px]"
        />
        <p className="t-label text-tinta-tenue mt-2 normal-case tracking-normal">Podés editar este resumen libremente antes de aprobarlo.</p>
      </div>

      <div className="mb-8">
        <label className="block t-label text-tinta-tenue mb-3">Categorías detectadas</label>
        <div className="flex flex-wrap gap-2">
          {categorias.map(cat => (
            <div key={cat.id} className="flex items-center gap-1.5 bg-lienzo px-2.5 py-1 rounded-full border border-hilo">
              <IconoInteres nombre={cat.icono} size={14} className="text-tinta-tenue" aria-hidden />
              <span className="t-label text-tinta">{cat.nombre}</span>
            </div>
          ))}
          {categorias.length === 0 && (
            <span className="t-body text-tinta-tenue italic">Ninguna categoría sugerida</span>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onAceptar}
          className="px-6 py-2.5 rounded-full t-label text-blanco-cosido sombra-boton hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--verde-bandera)' }}
        >
          Aceptar y continuar
        </button>
        <button
          onClick={onDescartar}
          className="px-6 py-2.5 rounded-full t-label text-tinta-tenue hover:bg-lienzo transition-colors"
        >
          Descartar sugerencia
        </button>
      </div>
    </div>
  )
}
