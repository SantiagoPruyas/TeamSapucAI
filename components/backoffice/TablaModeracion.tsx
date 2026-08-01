import React from 'react'
import { Check, X } from 'lucide-react'

// Dummy data for mockup matching
const MOCK_DATA = [
  { id: 1, usuario: 'María G.', depto: 'Corrientes', prop: 'Salud Mental en Escuelas', txt: 'Me parece muy bien, es necesario para nuestros chicos y chicas.', postura: 'A favor', estado: 'Pendiente' },
  { id: 2, usuario: 'Jorge R.', depto: 'Goya', prop: 'Salud Mental en Escuelas', txt: 'No estoy de acuerdo, hay otras prioridades.', postura: 'En contra', estado: 'Pendiente' },
  { id: 3, usuario: 'Lucila F.', depto: 'Mercedes', prop: 'Desarrollo Forestal Sostenible', txt: 'Excelente iniciativa, cuidemos nuestros montes nativos.', postura: 'A favor', estado: 'Pendiente' },
  { id: 4, usuario: 'usuario123', depto: 'Paso de los Libres', prop: 'Salud Mental en Escuelas', txt: 'Son unos ladrones todos!!!', postura: '—', estado: 'No apto' },
]

export function TablaModeracion({ filtro }: { filtro: string }) {
  // En un caso real filtraríamos, por ahora mostramos el dummy
  return (
    <table className="w-full text-left text-sm text-gray-700">
      <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold">
        <tr>
          <th className="px-4 py-3 w-10"></th>
          <th className="px-4 py-3">Usuario</th>
          <th className="px-4 py-3">Departamento</th>
          <th className="px-4 py-3">Propuesta</th>
          <th className="px-4 py-3">Transcripción</th>
          <th className="px-4 py-3">Postura IA</th>
          <th className="px-4 py-3">Estado IA</th>
          <th className="px-4 py-3 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {MOCK_DATA.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-400 text-xs text-center">{row.id}</td>
            <td className="px-4 py-3 font-semibold text-gray-900">{row.usuario}</td>
            <td className="px-4 py-3 text-gray-600">{row.depto}</td>
            <td className="px-4 py-3 text-gray-600">{row.prop}</td>
            <td className="px-4 py-3 text-gray-500 truncate max-w-[250px]" title={row.txt}>{row.txt}</td>
            <td className="px-4 py-3">
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                row.postura === 'A favor' ? 'text-green-700' :
                row.postura === 'En contra' ? 'text-red-700' :
                'text-gray-500'
              }`}>
                {row.postura}
              </span>
            </td>
            <td className="px-4 py-3">
              <span className={`text-xs font-semibold ${row.estado === 'No apto' ? 'text-red-600' : 'text-orange-500'}`}>
                {row.estado}
              </span>
            </td>
            <td className="px-4 py-3 flex items-center justify-end gap-2">
              <button className="flex items-center gap-1 text-green-700 font-semibold px-2 py-1 hover:bg-green-50 rounded">
                <Check size={14} /> Aprobar
              </button>
              <button className="flex items-center gap-1 text-red-600 font-semibold px-2 py-1 hover:bg-red-50 rounded">
                <X size={14} /> Ocultar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
