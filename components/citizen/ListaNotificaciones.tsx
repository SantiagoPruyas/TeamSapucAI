import Link from 'next/link'
import { Bell, MessageSquare } from 'lucide-react'
import type { Notificacion } from '@/lib/types'

type Props = {
  notificaciones: Notificacion[]
}

export function ListaNotificaciones({ notificaciones }: Props) {
  if (notificaciones.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-64 px-4">
        <Bell size={40} className="text-tinta-tenue mb-4 opacity-50" />
        <p className="text-tinta-tenue">Todavía no tenés notificaciones.</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {notificaciones.map(n => (
        <li key={n.id}>
          <Link
            href={`/detalle/${n.propuestaId}`}
            className={`block tarjeta-blanca hover:opacity-90 transition-opacity ${
              n.leida ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                {n.tipo === 'respuesta_diputado' ? (
                  <MessageSquare size={18} className="text-oro-filete" />
                ) : (
                  <Bell size={18} className="text-indigo-campo" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="t-label text-tinta-tenue mb-1">
                  {n.tipo === 'respuesta_diputado' ? 'Respuesta del diputado' : 'Nueva propuesta'}
                  {!n.leida && <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-cochinilla align-middle" />}
                </p>
                <p className="t-body text-tinta truncate">{n.propuestaTitulo}</p>
                <p className="text-xs text-tinta-tenue mt-1">
                  {new Date(n.createdAt).toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
