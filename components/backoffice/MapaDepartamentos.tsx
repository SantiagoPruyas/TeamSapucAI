import React from 'react'
import { Map } from 'lucide-react'

export function MapaDepartamentos() {
  return (
    <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[250px]">
      <h2 className="text-gray-900 font-bold mb-4 w-full text-left">Opinión por departamento</h2>
      <div className="flex-1 flex flex-col items-center justify-center opacity-50">
        <Map size={64} className="text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 font-semibold">Mapa simulado</p>
      </div>
    </div>
  )
}
