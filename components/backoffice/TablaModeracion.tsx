import React from 'react'
import { Check, X } from 'lucide-react'

// Dummy data for mockup matching
const MOCK_DATA = [
  { id: 1, usuario: 'María G.', depto: 'Corrientes', prop: 'Salud Mental en Escuelas', txt: 'Me parece muy bien, es necesario para nuestros chicos y chicas.', postura: 'A favor', estado: 'Pendiente' },
  { id: 2, usuario: 'Jorge R.', depto: 'Goya', prop: 'Salud Mental en Escuelas', txt: 'No estoy de acuerdo, hay otras prioridades.', postura: 'En contra', estado: 'Pendiente' },
  { id: 3, usuario: 'Lucila F.', depto: 'Mercedes', prop: 'Desarrollo Forestal Sostenible', txt: 'Excelente iniciativa, cuidemos nuestros montes nativos.', postura: 'A favor', estado: 'Pendiente' },
  { id: 4, usuario: 'usuario123', depto: 'Paso de los Libres', prop: 'Salud Mental en Escuelas', txt: 'Son unos ladrones todos!!!', postura: '—', estado: 'No apto' },
]

const colorPostura: Record<string, string> = {
  'A favor': 'var(--verde-bandera)',
  'En contra': 'var(--cochinilla)',
  '—': 'var(--gris-pizarra)',
}

export function TablaModeracion({ filtro }: { filtro: string }) {
  // En un caso real filtraríamos, por ahora mostramos el dummy
  return (
    <table className="w-full text-left">
      <thead className="border-b border-hilo">
        <tr>
          <th className="pl-4 pr-2 py-3 w-8"></th>
          <th className="px-2 py-3 t-label text-tinta-tenue whitespace-nowrap">Usuario</th>
          <th className="px-2 py-3 t-label text-tinta-tenue">Depto.</th>
          <th className="px-2 py-3 t-label text-tinta-tenue">Propuesta</th>
          <th className="px-2 py-3 t-label text-tinta-tenue">Transcripción</th>
          <th className="px-2 py-3 t-label text-tinta-tenue whitespace-nowrap">Postura IA</th>
          <th className="px-2 py-3 t-label text-tinta-tenue whitespace-nowrap">Estado IA</th>
          <th className="pl-2 pr-4 py-3 t-label text-tinta-tenue text-right whitespace-nowrap">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-hilo">
        {MOCK_DATA.map((row) => (
          <tr key={row.id} className="hover:bg-lienzo transition-colors">
            <td className="pl-4 pr-2 py-3 t-label text-gris-pizarra text-center">{row.id}</td>
            <td className="px-2 py-3 t-body font-semibold text-tinta whitespace-nowrap">{row.usuario}</td>
            <td className="px-2 py-3 t-body text-tinta-tenue max-w-[100px]">{row.depto}</td>
            <td className="px-2 py-3 t-body text-tinta-tenue max-w-[150px] line-clamp-2">{row.prop}</td>
            <td className="px-2 py-3 t-body text-tinta-tenue truncate max-w-[160px]" title={row.txt}>{row.txt}</td>
            <td className="px-2 py-3 whitespace-nowrap">
              <span
                className="t-label px-2 py-0.5 rounded-sm"
                style={{ backgroundColor: `color-mix(in srgb, ${colorPostura[row.postura]} 14%, transparent)`, color: colorPostura[row.postura] }}
              >
                {row.postura}
              </span>
            </td>
            <td className="px-2 py-3 whitespace-nowrap">
              <span
                className="t-label"
                style={{ color: row.estado === 'No apto' ? 'var(--cochinilla)' : 'var(--tinta-tenue)' }}
              >
                {row.estado}
              </span>
            </td>
            <td className="pl-2 pr-4 py-3 whitespace-nowrap">
              <div className="flex items-center justify-end gap-1.5">
                <button
                  title="Aprobar"
                  aria-label="Aprobar"
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-lienzo"
                  style={{ color: 'var(--verde-bandera)' }}
                >
                  <Check size={16} />
                </button>
                <button
                  title="Ocultar"
                  aria-label="Ocultar"
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-lienzo"
                  style={{ color: 'var(--cochinilla)' }}
                >
                  <X size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
