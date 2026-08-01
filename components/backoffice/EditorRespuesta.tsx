import React, { useState } from 'react'
import { Check, Send } from 'lucide-react'
import { publicarRespuesta } from '@/lib/mock/api.backoffice'

interface EditorRespuestaProps {
  totalSapucais: number
  propuestaId: string
}

export function EditorRespuesta({ totalSapucais, propuestaId }: EditorRespuestaProps) {
  const [texto, setTexto] = useState(
    'Muchas gracias por sus opiniones. Coincidimos en la importancia de la salud mental en nuestras escuelas y vamos a seguir trabajando para que esta ley sea una realidad...'
  )
  const [pidiendoConfirmacion, setPidiendoConfirmacion] = useState(false)
  const [isPublicando, setIsPublicando] = useState(false)
  const [publicadaEn, setPublicadaEn] = useState<string | null>(null)

  const handlePublicarClick = () => {
    setPidiendoConfirmacion(true)
  }

  const handleConfirmar = async () => {
    setIsPublicando(true)
    try {
      const respuesta = await publicarRespuesta(propuestaId, texto)
      setPublicadaEn(respuesta.createdAt)
    } catch (e) {
      console.error(e)
    } finally {
      setIsPublicando(false)
      setPidiendoConfirmacion(false)
    }
  }

  const publicada = publicadaEn !== null

  return (
    <div className="tarjeta-blanca p-6 flex flex-col h-full">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="t-title text-tinta">Respuesta del diputado</h2>
        {publicada && (
          <span className="flex items-center gap-1.5 t-label px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--verde-bandera)', color: 'var(--blanco-cosido)' }}>
            <Check size={12} /> Publicada · {new Date(publicadaEn!).toLocaleDateString('es-AR')}
          </span>
        )}
      </div>

      <p className="t-label text-tinta-tenue mb-4">
        Esta respuesta va a llegar a <span className="t-data text-tinta-tenue">{totalSapucais}</span> personas que enviaron un sapucai.
      </p>

      <div className="border border-hilo rounded-2xl flex-1 flex flex-col overflow-hidden mb-2 bg-lienzo">
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          disabled={publicada}
          className="flex-1 w-full p-3 resize-none t-body text-tinta outline-none bg-transparent disabled:opacity-70 min-h-[140px]"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="t-label text-tinta-tenue">
          <span className="t-data text-tinta-tenue">{texto.length}</span> caracteres
        </span>
      </div>

      {!publicada && (
        <div className="flex justify-end items-center gap-3">
          {pidiendoConfirmacion ? (
            <>
              <span className="t-label text-tinta-tenue">¿Confirmás publicar esta respuesta?</span>
              <button
                onClick={() => setPidiendoConfirmacion(false)}
                className="px-4 py-2 border border-hilo rounded-full t-label text-tinta hover:bg-lienzo"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmar}
                disabled={isPublicando}
                className="px-4 py-2 rounded-full sombra-boton t-label text-blanco-cosido flex items-center gap-2 disabled:opacity-60"
                style={{ backgroundColor: 'var(--verde-bandera)' }}
              >
                <Send size={14} /> {isPublicando ? 'Publicando...' : 'Sí, publicar'}
              </button>
            </>
          ) : (
            <button
              onClick={handlePublicarClick}
              disabled={texto.trim().length === 0}
              className="px-6 py-2 rounded-full sombra-boton t-label text-blanco-cosido bg-indigo-campo hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              Publicar respuesta
            </button>
          )}
        </div>
      )}
    </div>
  )
}
