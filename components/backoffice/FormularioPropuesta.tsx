import React, { useState } from 'react'
import { Bot, AlertTriangle, Send } from 'lucide-react'

interface FormularioPropuestaProps {
  titulo: string
  setTitulo: (t: string) => void
  texto: string
  setTexto: (t: string) => void
  onAnalizar: () => void
  isAnalizando: boolean
  error: string | null
}

export function FormularioPropuesta({
  titulo,
  setTitulo,
  texto,
  setTexto,
  onAnalizar,
  isAnalizando,
  error
}: FormularioPropuestaProps) {
  return (
    <div className="bg-[#EFEBE2] p-8 rounded shadow-sm border-l-4 border-[#17264A]">
      <div className="mb-6">
        <h2 className="text-xl font-display font-bold uppercase tracking-wider text-[#14181F] mb-2">
          Texto del Proyecto
        </h2>
        <p className="text-sm font-body text-[#5A6472]">
          Pegue aquí el texto completo del proyecto de ley. La IA lo analizará para generar un resumen en lenguaje claro (criollo) y sugerir las categorías correspondientes.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-[#5A6472] mb-2 font-body">Título Oficial de la Propuesta</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej. Ley de protección de humedales..."
          className="w-full bg-[#FBFAF7] text-[#14181F] p-4 rounded font-body font-semibold text-lg border border-[#D6CFC0] focus:border-[#C89A3C] focus:ring-1 focus:ring-[#C89A3C] outline-none"
          disabled={isAnalizando}
        />
      </div>

      <div className="mb-6 relative">
        <label className="block text-sm font-semibold text-[#5A6472] mb-2 font-body">Texto del Proyecto</label>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escriba o pegue el texto de la ley aquí..."
          className="w-full bg-[#FBFAF7] text-[#14181F] p-4 rounded font-body leading-relaxed border border-[#D6CFC0] focus:border-[#C89A3C] focus:ring-1 focus:ring-[#C89A3C] outline-none min-h-[400px] resize-y"
          disabled={isAnalizando}
        />
        {isAnalizando && (
          <div className="absolute inset-0 bg-[#EFEBE2]/60 backdrop-blur-[1px] flex items-center justify-center rounded">
            <div className="bg-[#17264A] text-[#FBFAF7] px-6 py-4 rounded shadow flex items-center gap-4">
              <Bot className="animate-pulse text-[#C89A3C]" />
              <span className="font-body font-semibold">La IA está procesando el texto...</span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 bg-[#A82418]/10 border-l-4 border-[#A82418] p-4 rounded flex gap-3 text-[#A82418]">
          <AlertTriangle className="shrink-0" />
          <div>
            <p className="font-semibold font-body text-sm mb-1">Ocurrió un problema al analizar</p>
            <p className="text-sm font-body">{error}</p>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={onAnalizar}
          disabled={texto.trim().length === 0 || titulo.trim().length === 0 || isAnalizando}
          className="bg-[#17264A] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0D1730] text-[#FBFAF7] font-body font-semibold px-8 py-3 rounded flex items-center gap-3 transition-colors"
        >
          <Bot size={18} />
          Analizar con IA
        </button>
      </div>
    </div>
  )
}
