import React from 'react'
import { Sapucai } from '@/lib/types'
import { Reproductor } from './Reproductor'

interface FilaSapucaiProps {
  sapucai: Sapucai
}

const colorPostura: Record<string, string> = {
  a_favor: 'var(--verde-bandera)',
  en_contra: 'var(--cochinilla)',
  neutro: 'var(--gris-pizarra)'
}

const labelPostura: Record<string, string> = {
  a_favor: 'A favor',
  en_contra: 'En contra',
  neutro: 'Neutro'
}

export function FilaSapucai({ sapucai }: FilaSapucaiProps) {
  const postura = sapucai.postura

  return (
    <div
      className="panel-lienzo p-4 flex flex-col gap-2"
      style={{ borderLeftColor: postura ? colorPostura[postura] : 'var(--indigo-campo)' }}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="t-body text-tinta font-semibold">{sapucai.autor.nombre}</span>
          <span className="t-label text-tinta-tenue">{sapucai.autor.departamento}</span>
        </div>
        <div className="flex items-center gap-3">
          {postura && (
            <span className="t-label px-2 py-0.5 rounded-sm" style={{ backgroundColor: colorPostura[postura], color: 'var(--blanco-cosido)' }}>
              {labelPostura[postura]}
            </span>
          )}
          <Reproductor audioUrl={sapucai.audioUrl} duracionSeg={sapucai.duracionSeg} />
        </div>
      </div>

      {sapucai.estadoProcesamiento === 'pendiente' && (
        <p className="t-label text-tinta-tenue italic">Transcripción pendiente de análisis.</p>
      )}
      {sapucai.estadoProcesamiento === 'error' && (
        <p className="t-label" style={{ color: 'var(--cochinilla)' }}>Error al procesar este sapucai.</p>
      )}
      {sapucai.transcripcion && (
        <p className="t-body text-tinta">{sapucai.transcripcion}</p>
      )}
      {sapucai.moderacionOk === false && (
        <p className="t-label" style={{ color: 'var(--cochinilla)' }}>
          Moderación: {sapucai.moderacionMotivo || 'contenido marcado'}
        </p>
      )}
    </div>
  )
}
