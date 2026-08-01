'use client'

interface PasoBienvenidaProps {
  onSiguiente: () => void
}

/**
 * PasoBienvenida — Paso 1 del onboarding.
 * Un único grito en Display (Regla del Único Grito).
 * Descripción en tarjeta blanca flotante (dirección "El Puente").
 * Copy correntino y directo.
 */
export function PasoBienvenida({ onSiguiente }: PasoBienvenidaProps) {
  return (
    <div className="flex flex-col flex-1 px-6 pt-8 pb-6 gap-8">
      {/* Momento de marca — arco degradé, único lugar donde aparece como fondo */}
      <div className="flex flex-col gap-4 items-start">
        <div
          className="gradiente-arco w-10 h-10 flex items-center justify-center rounded-full"
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L12.5 7.5H18L13.5 11L15 17L10 14L5 17L6.5 11L2 7.5H7.5L10 2Z"
              stroke="#FFFFFF" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <h1 className="t-display text-indigo-campo">
          SapucAI
        </h1>

        <p className="t-headline text-tinta-tenue" style={{ fontSize: '1.125rem', fontWeight: 400, letterSpacing: '0', textTransform: 'none', fontFamily: 'var(--font-sans)' }}>
          Tu voz llega a la Cámara
        </p>
      </div>

      {/* Tarjeta blanca flotante — toda descripción larga vive acá */}
      <div className="tarjeta-blanca flex flex-col gap-4">
        <p className="t-body text-tinta">
          Acá podés leer las propuestas de ley que se debaten en la Legislatura de Corrientes,
          mandar tu opinión grabada o escrita, y ver lo que responde el diputado.
        </p>
        <p className="t-body text-tinta-tenue">
          En menos de un minuto vas a estar adentro.
        </p>

        {/* Marca de datos de demostración */}
        <p className="t-label text-gris-pizarra border-t border-hilo pt-3 mt-1">
          datos de demostración
        </p>
      </div>

      {/* Botón principal — píldora sólida con sombra */}
      <div className="mt-auto">
        <button
          id="btn-empezar"
          onClick={onSiguiente}
          className="w-full h-13 flex items-center justify-center gap-2 rounded-full bg-indigo-campo text-blanco-cosido sombra-boton font-display font-semibold text-[0.8125rem] tracking-widest uppercase cursor-pointer transition-opacity active:opacity-80"
        >
          Empezar
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
