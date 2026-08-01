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
    <div className="bg-[#F7F5F0] rounded p-6 shadow-sm border-l-4 border-[#C89A3C]">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-[#C89A3C]" />
        <span className="font-display uppercase tracking-widest text-xs font-bold text-[#C89A3C]">
          Sugerido por IA
        </span>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#5A6472] mb-2 font-body">Resumen para el ciudadano</label>
        <textarea
          value={resumen}
          onChange={(e) => onResumenChange(e.target.value)}
          className="w-full bg-[#EFEBE2] text-[#14181F] p-4 rounded font-body leading-relaxed border-none focus:ring-1 focus:ring-[#C89A3C] outline-none resize-y min-h-[120px]"
        />
        <p className="text-xs text-[#5A6472] mt-2 font-body">Podés editar este resumen libremente antes de aprobarlo.</p>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-[#5A6472] mb-3 font-body">Categorías detectadas</label>
        <div className="flex flex-wrap gap-2">
          {categorias.map(cat => (
            <div key={cat.id} className="flex items-center gap-1.5 bg-[#EFEBE2] px-3 py-1.5 rounded-sm">
              <IconoInteres nombre={cat.icono} size={16} className="text-tinta-tenue" aria-hidden />
              <span className="font-display uppercase tracking-wider text-xs font-semibold text-[#14181F]">{cat.nombre}</span>
            </div>
          ))}
          {categorias.length === 0 && (
            <span className="text-[#5A6472] font-body text-sm italic">Ninguna categoría sugerida</span>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onAceptar}
          className="bg-[#1E6B45] hover:bg-[#154d31] text-[#FBFAF7] font-body font-semibold px-6 py-2.5 rounded transition-colors"
        >
          Aceptar y continuar
        </button>
        <button
          onClick={onDescartar}
          className="bg-transparent hover:bg-[#EFEBE2] text-[#5A6472] font-body font-semibold px-6 py-2.5 rounded transition-colors"
        >
          Descartar sugerencia
        </button>
      </div>
    </div>
  )
}
