'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, CheckCircle2, AlertTriangle, Plus } from 'lucide-react'
import { crearPropuesta, pedirSugerenciaIA, publicarPropuesta } from '@/lib/mock/api.backoffice'
import { intereses } from '@/lib/mock/data'

export default function CargaDePropuestaMockup() {
  const router = useRouter()
  
  const [titulo, setTitulo] = useState('Proyecto de Ley para la Promoción de la Salud Mental en Escuelas')
  const [texto, setTexto] = useState('ARTÍCULO 1º.- Créase el Programa Provincial de Promoción de la Salud Mental en el Ámbito Educativo...')
  
  const [resumen, setResumen] = useState('Busca que todas las escuelas tengan programas de prevención y acompañamiento psicológico para estudiantes y familias. Se capacitará a docentes y se trabajará en conjunto con centros de salud.')
  const [interesesSugeridos, setInteresesSugeridos] = useState<string[]>(['salud', 'educacion', 'ambiente'])
  
  const [isAnalizando, setIsAnalizando] = useState(false)
  const [publicado, setPublicado] = useState(false)

  const handleAnalizar = async () => {
    setIsAnalizando(true)
    try {
      const sug = await pedirSugerenciaIA(texto)
      setResumen(sug.resumenIa)
      setInteresesSugeridos(sug.interesesSugeridos)
    } catch(e) {
      // ignore
    } finally {
      setIsAnalizando(false)
    }
  }

  const handleGuardar = async () => {
    setPublicado(true)
    setTimeout(() => {
      router.push('/backoffice/panel/p1') // Mock redirect to panel
    }, 1500)
  }

  if (publicado) {
    return (
      <div className="bg-[#FBFAF7] p-8 rounded shadow text-center h-[600px] flex flex-col justify-center">
        <CheckCircle2 size={48} className="text-[#1E6B45] mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Propuesta Publicada</h2>
        <p className="text-gray-600">Redirigiendo al panel...</p>
      </div>
    )
  }

  return (
    <div className="bg-[#FBFAF7] rounded shadow-sm min-h-screen">
      <div className="border-b px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#14181F]">Carga de propuesta</h1>
        <span className="text-sm font-semibold text-gray-500">Paso 1 de 3</span>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Izquierda: Inputs */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded p-3 text-sm focus:ring-1 outline-none"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Texto del proyecto</label>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="w-full flex-1 min-h-[300px] bg-white border border-gray-300 rounded p-3 text-sm resize-none focus:ring-1 outline-none"
            />
          </div>
        </div>

        {/* Derecha: IA */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#F2F9F9] rounded border border-[#E0F2F1] p-6 relative h-full flex flex-col">
            <label className="block text-sm font-bold text-teal-800 mb-4">Resumen sugerido por IA</label>
            
            <textarea
              value={resumen}
              onChange={e => setResumen(e.target.value)}
              className="w-full flex-1 bg-transparent border-none p-0 text-sm resize-none text-teal-900 outline-none leading-relaxed"
            />
            
            <div className="flex justify-end mt-4">
              <button className="text-sm text-teal-700 font-bold hover:underline">Editar</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-teal-800 mb-3">Categorías sugeridas por IA</label>
            <div className="flex items-center gap-2 flex-wrap">
              {interesesSugeridos.map(id => {
                const cat = intereses.find(i => i.id === id)
                return cat ? (
                  <span key={id} className="bg-teal-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                    {cat.nombre}
                  </span>
                ) : null
              })}
              <button className="text-teal-700 text-sm font-semibold flex items-center gap-1 ml-2">
                <Plus size={16} /> Agregar categoría
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t px-8 py-6 flex items-center justify-between bg-white mt-auto">
        <button className="px-6 py-2 border border-gray-300 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50">
          Guardar borrador
        </button>
        <button onClick={handleGuardar} className="px-8 py-2 bg-[#17264A] text-white rounded text-sm font-semibold hover:bg-blue-900">
          Siguiente
        </button>
      </div>
    </div>
  )
}
