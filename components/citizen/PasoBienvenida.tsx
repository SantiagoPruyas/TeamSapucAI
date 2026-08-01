'use client'

interface PasoBienvenidaProps {
  onSiguiente: () => void
}

/**
 * PasoBienvenida — Paso 1 del onboarding.
 * Un único grito en Display (Regla del Único Grito).
 * Descripción en panel de Lienzo (Regla del Lienzo).
 * Copy correntino y directo.
 */
export function PasoBienvenida({ onSiguiente }: PasoBienvenidaProps) {
  return (
    <div className="flex flex-col flex-1 px-6 pt-8 pb-6 gap-8">
      {/* Campo de índigo con el grito — Único Display de la pantalla */}
      <div className="flex flex-col gap-4">
        <div
          className="w-10 h-10 flex items-center justify-center"
          style={{ border: '1px solid #C89A3C', borderRadius: '50%' }}
          aria-hidden
        >
          {/* Sello placeholder — 40px, único círculo permitido */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L12.5 7.5H18L13.5 11L15 17L10 14L5 17L6.5 11L2 7.5H7.5L10 2Z"
              stroke="#C89A3C" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <h1 className="t-display" style={{ color: '#FBFAF7' }}>
          SapucAI
        </h1>

        <p className="t-headline" style={{ color: 'rgba(251,250,247,0.7)', fontSize: '1.125rem', fontWeight: 400, letterSpacing: '0', textTransform: 'none', fontFamily: 'var(--font-sans)' }}>
          El estandarte cívico correntino
        </p>
      </div>

      {/* Panel de lienzo — toda descripción larga vive acá */}
      <div className="panel-lienzo flex flex-col gap-4">
        <p className="t-body" style={{ color: '#14181F' }}>
          Acá podés leer las propuestas de ley que se debaten en la Legislatura de Corrientes,
          mandar tu opinión grabada o escrita, y ver lo que responde el diputado.
        </p>
        <p className="t-body" style={{ color: '#5A6472' }}>
          En menos de un minuto vas a estar adentro.
        </p>

        {/* Marca de datos de demostración */}
        <p className="t-label" style={{ color: '#77808F', borderTop: '1px solid #D6CFC0', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
          datos de demostración
        </p>
      </div>

      {/* Botón principal */}
      <div className="mt-auto">
        <button
          id="btn-empezar"
          onClick={onSiguiente}
          className="w-full flex items-center justify-center gap-2 transition-opacity active:opacity-80"
          style={{
            height: '52px',
            backgroundColor: '#EFEBE2',
            color: '#14181F',
            border: '1px solid #C89A3C',
            borderRadius: '2px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Empezar
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#14181F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
