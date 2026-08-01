'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getPanel, getArgumentos, generarArgumentos } from '@/lib/mock/api.backoffice'
import { MetricasCabecera } from '@/components/backoffice/MetricasCabecera'
import { ResumenPropuesta } from '@/components/backoffice/ResumenPropuesta'
import { Termometro } from '@/components/backoffice/Termometro'
import { ArgumentosAgrupados } from '@/components/backoffice/ArgumentosAgrupados'
import { Propuesta, Interes, Argumento } from '@/lib/types'

type PanelData = Propuesta & {
  interesesDetalle: Interes[]
  participacionPorcentaje: number
  sapucaisPendientesAnalisis: number
}

export default function PanelDiputadoPage() {
  const { propuestaId } = useParams()
  
  const [data, setData] = useState<PanelData | null>(null)
  const [argumentos, setArgumentos] = useState<Argumento[] | null>(null)
  
  const [isLoading, setIsLoading] = useState(true)
  const [isAgrupando, setIsAgrupando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const panelData = await getPanel(propuestaId as string)
        setData(panelData as PanelData)
        
        const args = await getArgumentos(propuestaId as string)
        setArgumentos(args)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [propuestaId])

  const handleAgrupar = async () => {
    setIsAgrupando(true)
    try {
      const args = await generarArgumentos(propuestaId as string)
      setArgumentos(args)
    } catch (err: any) {
      alert("Error simulado al agrupar: " + err.message)
    } finally {
      setIsAgrupando(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-[#C89A3C] font-display font-bold uppercase tracking-widest text-xl">
          Cargando panel...
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-[#A82418]/10 border-l-4 border-[#A82418] p-6 rounded text-[#A82418]">
        <h2 className="font-display font-bold text-xl uppercase mb-2">Error</h2>
        <p className="font-body">{error || "Propuesta no encontrada"}</p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#17264A] pb-6">
        <div>
          <h1 className="text-4xl font-display font-bold uppercase tracking-wider text-[#FBFAF7] leading-none mb-2">
            Panel de Análisis
          </h1>
          <p className="font-body text-[#D6CFC0] text-lg">
            Monitoreo en tiempo real de la participación ciudadana.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Columna Izquierda: Datos y Contexto */}
        <div className="xl:col-span-5 space-y-8">
          <MetricasCabecera 
            totalSapucais={data.totalSapucais}
            participacionPorcentaje={data.participacionPorcentaje}
            pendientesAnalisis={data.sapucaisPendientesAnalisis}
            esMock={true}
          />
          <ResumenPropuesta 
            titulo={data.titulo}
            resumen={data.resumenIa}
            intereses={data.interesesDetalle}
          />
        </div>

        {/* Columna Derecha: El Pulso (Termómetro y Argumentos) */}
        <div className="xl:col-span-7 space-y-8">
          <Termometro 
            aFavor={data.termometro.aFavor}
            enContra={data.termometro.enContra}
            neutro={data.termometro.neutro}
          />

          <div>
            <h2 className="text-[#FBFAF7] font-display uppercase tracking-wider text-xl font-bold mb-4">
              Síntesis de Argumentos
            </h2>
            <ArgumentosAgrupados 
              argumentos={argumentos}
              totalSapucais={data.totalSapucais}
              onAgrupar={handleAgrupar}
              isAgrupando={isAgrupando}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
