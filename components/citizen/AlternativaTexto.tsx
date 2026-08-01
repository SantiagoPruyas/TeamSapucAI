'use client'

import { useState } from 'react'

type Props = {
  onEnviar: (texto: string) => void
  motivo?: string
}

/**
 * Camino alternativo cuando no hay micrófono disponible (permiso denegado o
 * MediaRecorder no soportado). Nunca dejamos al ciudadano sin poder mandar
 * su sapucai.
 */
export default function AlternativaTexto({ onEnviar, motivo }: Props) {
  const [texto, setTexto] = useState('')

  return (
    <div className="w-full">
      <p className="t-label text-tinta-tenue mb-3">
        {motivo || 'No pudimos acceder al micrófono.'} Escribí tu sapucai en cambio:
      </p>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={6}
        maxLength={500}
        placeholder="Contanos qué pensás sobre esta propuesta..."
        className="w-full bg-lienzo border border-hilo rounded-[14px] p-4 t-body text-tinta resize-none outline-none focus:border-oro-filete"
      />
      <button
        disabled={!texto.trim()}
        onClick={() => onEnviar(texto.trim())}
        className={`w-full mt-4 py-4 rounded-full font-bold uppercase tracking-widest text-blanco-cosido transition-colors ${
          texto.trim() ? 'bg-indigo-campo hover:opacity-90' : 'bg-hilo'
        }`}
      >
        Enviar
      </button>
    </div>
  )
}
