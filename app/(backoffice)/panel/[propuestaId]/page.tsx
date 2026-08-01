'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Propuesta, Argumento } from '@/lib/types'
import { getPanel, getArgumentos, generarArgumentos } from '@/lib/mock/api.backoffice'

import { ResumenPropuesta } from '@/components/backoffice/ResumenPropuesta'
import { MetricasCabecera } from '@/components/backoffice/MetricasCabecera'
import { Termometro } from '@/components/backoffice/Termometro'
import { ArgumentosAgrupados } from '@/components/backoffice/ArgumentosAgrupados'
import { MapaDepartamentos } from '@/components/backoffice/MapaDepartamentos'
import { EditorRespuesta } from '@/components/backoffice/EditorRespuesta'
import { Download } from 'lucide-react'

export default function PanelDiputadoPage() {
  const { propuestaId } = useParams()
  
  const [propuesta, setPropuesta] = useState<Propuesta | null>(null)
  const [argumentos, setArgumentos] = useState<Argumento[] | null>(null)
  
  const [isLoading, setIsLoading] = useState(true)
  const [isAgrupando, setIsAgrupando] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const id = Array.isArray(propuestaId) ? propuestaId[0] : (propuestaId as string)
        if (!id) return
        const data = await getPanel(id)
        setPropuesta(data)
        
        // Cargar argumentos si tiene
        if (data && data.totalSapucais > 0) {
          const args = await getArgumentos(id)
          setArgumentos(args)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [propuestaId])

  const handleAgrupar = async () => {
    if (!propuesta) return
    setIsAgrupando(true)
    try {
      const result = await generarArgumentos(propuesta.id)
      setArgumentos(result)
    } catch (e) {
      console.error(e)
    } finally {
      setIsAgrupando(false)
    }
  }

  if (isLoading) {
    return <div className="p-8 font-display text-white">Cargando panel...</div>
  }

  if (!propuesta) {
    return <div className="p-8 font-display text-white">No se encontró la propuesta.</div>
  }

  return (
    <div className="bg-[#FBFAF7] min-h-screen text-gray-900">
      {/* Header section identical to mockup */}
      <div className="px-8 py-6 border-b flex justify-between items-start bg-white">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold font-display max-w-2xl leading-tight text-[#14181F]">
            {propuesta.titulo}
          </h1>
          <span className="bg-[#1E6B45]/10 text-[#1E6B45] text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest">
            Publicado
          </span>
        </div>
        <button className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 text-sm font-semibold hover:bg-gray-50">
          <Download size={16}/> Exportar
        </button>
      </div>

      {/* Main Grid: 2 columns */}
      <div className="p-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          <div className="h-[300px]">
            <Termometro {...propuesta.termometro} />
          </div>
          <div className="h-[300px]">
            <MapaDepartamentos />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          <div className="h-[300px]">
            <ArgumentosAgrupados 
              argumentos={argumentos} 
              totalSapucais={propuesta.totalSapucais}
              onAgrupar={handleAgrupar}
              isAgrupando={isAgrupando}
            />
          </div>
          <div className="h-[300px]">
            <EditorRespuesta />
          </div>
        </div>

      </div>
    </div>
  )
}
