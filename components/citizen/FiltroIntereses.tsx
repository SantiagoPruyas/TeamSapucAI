import React from 'react'
import Link from 'next/link'
import { Filter } from 'lucide-react'

interface FiltroInteresesProps {
  interesesCount: number
}

export function FiltroIntereses({ interesesCount }: FiltroInteresesProps) {
  return (
    <div className="w-full px-6 py-4 flex items-center justify-between text-[#FBFAF7] border-b border-[#14181F]/10">
      <div className="flex items-center gap-3">
        <Filter size={18} className="text-[#C89A3C]" />
        <div>
          <p className="font-display uppercase tracking-widest text-xs font-bold text-[#D6CFC0]">
            Feed Filtrado
          </p>
          <p className="font-body text-sm">
            Mostrando {interesesCount === 0 ? "todos los temas" : `${interesesCount} temas elegidos`}
          </p>
        </div>
      </div>
      <Link 
        href="/onboarding" 
        className="text-[#C89A3C] font-display uppercase tracking-widest text-xs font-bold hover:underline"
      >
        Cambiar
      </Link>
    </div>
  )
}
