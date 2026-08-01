'use client'

import { useState } from 'react'
import type { Interes } from '@/lib/types'

interface PasoInteresesProps {
  intereses: Interes[]
  onFinalizar: (interesesSeleccionados: string[]) => void
  onAnterior: () => void
  cargando?: boolean
}

/**
 * PasoIntereses — Paso 3: grilla de insignias seleccionables.
 *
 * REGLAS de DESIGN.md aplicadas:
 * - Insignias mín 88px de alto (Regla de la Insignia)
 * - Seleccionado: invierte a Lienzo con filete dorado — NUNCA usa color de categoría
 * - Los temas se distinguen solo por ícono y etiqueta, nunca por color
 * - Se puede avanzar sin intereses elegidos, pero se avisa qué se pierde
 */
export function PasoIntereses({ intereses, onFinalizar, onAnterior, cargando }: PasoInteresesProps) {
  const [seleccionados, setSeleccionados] = useState<Set<string>>(new Set())
  const [enviando, setEnviando] = useState(false)

  function toggleInteres(id: string) {
    setSeleccionados(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function handleFinalizar() {
    setEnviando(true)
    await onFinalizar(Array.from(seleccionados))
    setEnviando(false)
  }

  return (
    <div className="flex flex-col flex-1 px-6 pt-4 pb-6 gap-5">
      {/* Encabezado — Headline, no Display */}
      <div>
        <h2 className="t-headline" style={{ color: '#FBFAF7' }}>
          ¿De qué te querés enterar?
        </h2>
        <p className="t-body" style={{ color: 'rgba(251,250,247,0.6)', marginTop: '0.5rem', fontSize: '0.9375rem' }}>
          Elegí los temas que más te importan. El feed te va a mostrar primero las propuestas de esas áreas.
        </p>
      </div>

      {/* Grilla de insignias — 2 columnas, mín 88px de alto */}
      {cargando ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: '88px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '2px',
                border: '1px solid rgba(255,255,255,0.08)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3" role="group" aria-label="Temas de interés">
          {intereses.map(interes => {
            const activo = seleccionados.has(interes.id)
            return (
              <button
                key={interes.id}
                id={`interes-${interes.id}`}
                onClick={() => toggleInteres(interes.id)}
                aria-pressed={activo}
                style={{
                  /* Mínimo 88px — objetivo táctil grande para el pulgar */
                  minHeight: '88px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '1rem 0.5rem',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 180ms var(--ease-tela)',

                  /* Seleccionado: invierte a Lienzo con filete dorado */
                  backgroundColor: activo ? '#EFEBE2' : 'rgba(255,255,255,0.06)',
                  border: activo ? '1px solid #C89A3C' : '1px solid rgba(255,255,255,0.12)',
                  color: activo ? '#14181F' : '#FBFAF7',

                  /* NO hay color de categoría — solo ícono + etiqueta */
                }}
              >
                <span
                  style={{ fontSize: '1.75rem', lineHeight: 1 }}
                  aria-hidden
                >
                  {interes.icono}
                </span>
                <span
                  className="t-label"
                  style={{
                    color: activo ? '#14181F' : '#FBFAF7',
                    letterSpacing: '0.06em',
                    fontSize: '0.6875rem',
                    textAlign: 'center',
                  }}
                >
                  {interes.nombre}
                </span>
                {activo && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6l3 3 5-5" stroke="#C89A3C" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Aviso si no eligió nada — nunca un botón trabado sin explicación */}
      {seleccionados.size === 0 && (
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(120,128,143,0.12)',
            borderLeft: '3px solid #77808F',
            borderRadius: '2px',
          }}
        >
          <p className="t-body" style={{ color: 'rgba(251,250,247,0.7)', fontSize: '0.875rem' }}>
            Si no elegís ningún tema, el feed te va a mostrar todas las propuestas sin filtrar.
            Podés cambiar esto cuando quieras.
          </p>
        </div>
      )}

      {seleccionados.size > 0 && (
        <p className="t-label" style={{ color: '#C89A3C', letterSpacing: 0, textTransform: 'none', fontSize: '0.8125rem', fontFamily: 'var(--font-sans)', fontWeight: 400, textAlign: 'center' }}>
          {seleccionados.size} {seleccionados.size === 1 ? 'tema elegido' : 'temas elegidos'}
        </p>
      )}

      {/* Botones */}
      <div className="mt-auto flex gap-3">
        <button
          onClick={onAnterior}
          disabled={enviando}
          style={{
            height: '52px',
            flex: '0 0 auto',
            width: '52px',
            backgroundColor: 'transparent',
            color: '#FBFAF7',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: enviando ? 'not-allowed' : 'pointer',
          }}
          aria-label="Volver al paso anterior"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          id="btn-finalizar-onboarding"
          onClick={handleFinalizar}
          disabled={enviando}
          style={{
            height: '52px',
            flex: 1,
            backgroundColor: '#EFEBE2',
            color: '#14181F',
            border: '1px solid #C89A3C',
            borderRadius: '2px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: enviando ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            opacity: enviando ? 0.7 : 1,
            transition: 'opacity 150ms',
          }}
        >
          {enviando ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }} aria-hidden>
                <circle cx="8" cy="8" r="6" stroke="#14181F" strokeWidth="1.5" strokeDasharray="20 10" />
              </svg>
              Guardando...
            </>
          ) : (
            <>
              {seleccionados.size === 0 ? 'Entrar sin filtros' : 'Entrar'}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#14181F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
