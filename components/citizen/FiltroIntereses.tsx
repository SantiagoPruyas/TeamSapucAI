import React from 'react'
import Link from 'next/link'
import { Filter } from 'lucide-react'

interface FiltroInteresesProps {
  interesesCount: number
}

export function FiltroIntereses({ interesesCount }: FiltroInteresesProps) {
  return (
    <div className="w-full px-6 py-4 flex items-center justify-between text-tinta border-b border-hilo">
      <div className="flex items-center gap-3">
        <Filter size={18} className="text-oro-filete" />
        <div>
          <p className="t-label text-tinta-tenue">
            Feed Filtrado
          </p>
          <p className="t-body text-tinta text-sm">
            Mostrando {interesesCount === 0 ? "todos los temas" : `${interesesCount} temas elegidos`}
          </p>
        </div>
      </div>
      <Link
        href="/onboarding"
        className="text-oro-filete t-label hover:underline"
      >
        Cambiar
      </Link>
    </div>
  )
}
