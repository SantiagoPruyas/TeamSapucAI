'use client'

import { useState } from 'react'
import type { Interes } from '@/lib/types'
import { IconoInteres } from '@/components/ui/icono-interes'

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
 * - Seleccionado: invierte a tono lienzo con filete celeste — NUNCA usa color de categoría
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
        <h2 className="t-headline text-indigo-campo">
          ¿De qué te querés enterar?
        </h2>
        <p className="t-body text-tinta-tenue mt-2 text-[0.9375rem]">
          Elegí los temas que más te importan. El feed te va a mostrar primero las propuestas de esas áreas.
        </p>
      </div>

      {/* Grilla de insignias — 2 columnas, mín 88px de alto */}
      {cargando ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-[88px] rounded-[14px] border border-hilo bg-lienzo animate-pulse"
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
                className={`min-h-[88px] flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-[14px] cursor-pointer transition-all border ${
                  activo
                    ? 'bg-lienzo border-oro-filete'
                    : 'bg-lienzo-hueso border-hilo sombra-suave'
                }`}
                style={{ transitionTimingFunction: 'var(--ease-tela)', transitionDuration: '180ms' }}
              >
                <IconoInteres
                  nombre={interes.icono}
                  size={28}
                  className={activo ? 'text-indigo-campo' : 'text-tinta-tenue'}
                  aria-hidden
                />
                <span
                  className={`t-label text-center tracking-[0.06em] text-[0.6875rem] ${activo ? 'text-indigo-campo' : 'text-tinta'}`}
                >
                  {interes.nombre}
                </span>
                {activo && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6l3 3 5-5" stroke="var(--oro-filete)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Aviso si no eligió nada — nunca un botón trabado sin explicación */}
      {seleccionados.size === 0 && (
        <div className="p-3 px-4 bg-lienzo border-l-[3px] border-gris-pizarra rounded-[14px]">
          <p className="t-body text-tinta-tenue text-sm">
            Si no elegís ningún tema, el feed te va a mostrar todas las propuestas sin filtrar.
            Podés cambiar esto cuando quieras.
          </p>
        </div>
      )}

      {seleccionados.size > 0 && (
        <p className="t-label text-oro-filete tracking-normal normal-case text-[0.8125rem] font-sans font-normal text-center">
          {seleccionados.size} {seleccionados.size === 1 ? 'tema elegido' : 'temas elegidos'}
        </p>
      )}

      {/* Botones */}
      <div className="mt-auto flex gap-3">
        <button
          onClick={onAnterior}
          disabled={enviando}
          className={`h-13 w-13 shrink-0 rounded-full flex items-center justify-center border border-indigo-campo text-indigo-campo ${
            enviando ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
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
          className="h-13 flex-1 rounded-full bg-indigo-campo text-blanco-cosido sombra-boton font-display font-semibold text-[0.8125rem] tracking-widest uppercase flex items-center justify-center gap-2 transition-opacity"
          style={{ opacity: enviando ? 0.7 : 1, cursor: enviando ? 'wait' : 'pointer' }}
        >
          {enviando ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="animate-spin" aria-hidden>
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 10" />
              </svg>
              Guardando...
            </>
          ) : (
            <>
              {seleccionados.size === 0 ? 'Entrar sin filtros' : 'Entrar'}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
