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
import { ListaSapucais } from '@/components/backoffice/ListaSapucais'
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
    return (
      <div className="min-h-screen bg-lienzo-hueso flex items-center justify-center">
        <p className="t-body text-tinta">Cargando panel...</p>
      </div>
    )
  }

  if (!propuesta) {
    return (
      <div className="min-h-screen bg-lienzo-hueso flex items-center justify-center">
        <p className="t-body text-tinta">No se encontró la propuesta.</p>
      </div>
    )
  }

  const id = Array.isArray(propuestaId) ? propuestaId[0] : (propuestaId as string)

  return (
    <div className="bg-lienzo-hueso min-h-screen">
      <div className="mx-auto max-w-[1280px] px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="t-headline text-indigo-campo max-w-2xl leading-tight">
              {propuesta.titulo}
            </h1>
            <span className="bg-verde-bandera/10 text-verde-bandera t-label px-3 py-1 rounded-full border border-verde-bandera/30">
              {propuesta.estado}
            </span>
          </div>
          <button className="flex items-center gap-2 border border-hilo text-indigo-campo rounded-full px-4 py-2 t-label hover:bg-lienzo transition-colors shrink-0 sombra-suave">
            <Download size={16} /> Exportar
          </button>
        </div>

        {/* Grid de 12 columnas */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <ResumenPropuesta
              titulo={propuesta.titulo}
              resumen={propuesta.resumenIa}
              intereses={(propuesta as any).interesesDetalle ?? []}
            />
          </div>

          <div className="col-span-12">
            <MetricasCabecera
              totalSapucais={propuesta.totalSapucais}
              participacionPorcentaje={(propuesta as any).participacionPorcentaje ?? 0}
              pendientesAnalisis={(propuesta as any).sapucaisPendientesAnalisis ?? 0}
              esMock
            />
          </div>

          <div className="col-span-12 xl:col-span-7">
            <Termometro {...propuesta.termometro} />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <MapaDepartamentos propuestaId={id} />
          </div>

          <div className="col-span-12 xl:col-span-6">
            <ArgumentosAgrupados
              argumentos={argumentos}
              totalSapucais={propuesta.totalSapucais}
              onAgrupar={handleAgrupar}
              isAgrupando={isAgrupando}
            />
          </div>

          <div className="col-span-12 xl:col-span-6">
            <EditorRespuesta totalSapucais={propuesta.totalSapucais} propuestaId={id} />
          </div>

          <div className="col-span-12">
            <ListaSapucais propuestaId={id} />
          </div>
        </div>
      </div>
    </div>
  )
}
