'use client'

interface ProgresoProps {
  paso: 1 | 2 | 3
  total?: number
}

/**
 * Progreso — barra de pasos lineal para el onboarding.
 * Usa Oro Filete solo como 1px de borde, nunca como relleno.
 * El paso activo: lienzo sobre campo. Los anteriores: lienzo atenuado.
 */
export function Progreso({ paso, total = 3 }: ProgresoProps) {
  return (
    <nav aria-label="Pasos del registro" className="flex items-center gap-2 px-6 py-4">
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1
        const activo = n === paso
        const completado = n < paso
        return (
          <div key={n} className="flex items-center gap-2 flex-1">
            <div
              className="flex items-center justify-center w-7 h-7 rounded-full transition-all"
              style={{
                border: activo
                  ? '1px solid var(--indigo-campo)'
                  : completado
                  ? '1px solid var(--oro-filete)'
                  : '1px solid var(--hilo)',
                backgroundColor: activo
                  ? 'var(--indigo-campo)'
                  : completado
                  ? 'var(--lienzo)'
                  : 'transparent',
                color: activo ? 'var(--blanco-cosido)' : completado ? 'var(--oro-filete)' : 'var(--tinta-tenue)',
              }}
              aria-current={activo ? 'step' : undefined}
            >
              {completado ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2 6l3 3 5-5" stroke="var(--oro-filete)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span className="t-label text-xs" style={{ fontSize: '0.625rem' }}>{n}</span>
              )}
            </div>
            {n < total && (
              <div
                className="h-px flex-1 transition-all"
                style={{
                  backgroundColor: completado ? 'var(--oro-filete)' : 'var(--hilo)',
                }}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
