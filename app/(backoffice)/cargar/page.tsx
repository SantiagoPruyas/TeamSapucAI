'use client'

import React, { useState } from 'react'
import { FormularioPropuesta } from '@/components/backoffice/FormularioPropuesta'
import { SugerenciaIA } from '@/components/backoffice/SugerenciaIA'
import { crearPropuesta, pedirSugerenciaIA, publicarPropuesta } from '@/lib/mock/api.backoffice'
import { useRouter } from 'next/navigation'
import { CheckCircle2, AlertTriangle } from 'lucide-react'

type Paso = 'formulario' | 'sugerencia' | 'publicado'

export default function CargarPage() {
  const router = useRouter()
  
  const [paso, setPaso] = useState<Paso>('formulario')
  
  const [titulo, setTitulo] = useState('')
  const [textoOriginal, setTextoOriginal] = useState('')
  
  const [isAnalizando, setIsAnalizando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [propuestaId, setPropuestaId] = useState<string | null>(null)
  
  const [resumenIa, setResumenIa] = useState('')
  const [interesesSugeridos, setInteresesSugeridos] = useState<string[]>([])
  
  const handleAnalizar = async () => {
    setIsAnalizando(true)
    setError(null)
    try {
      // 1. Guardar la propuesta en estado procesando (para no perder el texto)
      const p = await crearPropuesta(titulo, textoOriginal)
      setPropuestaId(p.id)
      
      // 2. Pedir sugerencia a la IA
      const sug = await pedirSugerenciaIA(textoOriginal)
      setResumenIa(sug.resumenIa)
      setInteresesSugeridos(sug.interesesSugeridos)
      
      // 3. Cambiar de paso
      setPaso('sugerencia')
    } catch (e: any) {
      setError(e.message || "Fallo de red al analizar. La propuesta está guardada.")
    } finally {
      setIsAnalizando(false)
    }
  }
  
  const handlePublicarAsi = async () => {
    if (!propuestaId) return
    setIsAnalizando(true)
    setError(null)
    try {
      await publicarPropuesta(propuestaId, "Sin resumen", [])
      setPaso('publicado')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsAnalizando(false)
    }
  }

  const handleReintentar = async () => {
    if (!propuestaId) return
    setIsAnalizando(true)
    setError(null)
    try {
      const sug = await pedirSugerenciaIA(textoOriginal)
      setResumenIa(sug.resumenIa)
      setInteresesSugeridos(sug.interesesSugeridos)
      setPaso('sugerencia')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsAnalizando(false)
    }
  }

  const handleAceptarSugerencia = async () => {
    if (!propuestaId) return
    setIsAnalizando(true)
    setError(null)
    try {
      await publicarPropuesta(propuestaId, resumenIa, interesesSugeridos)
      setPaso('publicado')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsAnalizando(false)
    }
  }

  const handleDescartarSugerencia = async () => {
    if (!propuestaId) return
    setIsAnalizando(true)
    setError(null)
    try {
      await publicarPropuesta(propuestaId, "Resumen descartado manualmente", [])
      setPaso('publicado')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsAnalizando(false)
    }
  }

  if (paso === 'publicado') {
    return (
      <div className="bg-[#EFEBE2] p-8 rounded shadow-sm text-center">
        <CheckCircle2 size={48} className="text-[#1E6B45] mx-auto mb-4" />
        <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-[#14181F] mb-2">
          Propuesta Publicada
        </h2>
        <p className="font-body text-[#5A6472] mb-6">
          La propuesta se ha publicado exitosamente y ya es visible para los ciudadanos.
        </p>
        <button
          onClick={() => {
            setTitulo('')
            setTextoOriginal('')
            setPropuestaId(null)
            setResumenIa('')
            setInteresesSugeridos([])
            setPaso('formulario')
          }}
          className="bg-[#17264A] hover:bg-[#0D1730] text-[#FBFAF7] font-body font-semibold px-6 py-2.5 rounded transition-colors"
        >
          Cargar otra propuesta
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold uppercase tracking-wider text-[#FBFAF7] mb-2">
          Cargar nueva propuesta
        </h1>
        <p className="font-body text-[#D6CFC0]">
          Pegue el texto original y deje que la IA extraiga el resumen para los ciudadanos.
        </p>
      </div>

      <FormularioPropuesta
        titulo={titulo}
        setTitulo={setTitulo}
        texto={textoOriginal}
        setTexto={setTextoOriginal}
        onAnalizar={handleAnalizar}
        isAnalizando={isAnalizando}
        error={error}
      />

      {error && paso === 'formulario' && propuestaId && (
        <div className="bg-[#EFEBE2] p-6 rounded shadow-sm flex items-center justify-between">
          <div className="flex gap-3 text-[#A82418]">
            <AlertTriangle className="shrink-0" />
            <div>
              <p className="font-semibold font-body text-sm mb-1">La propuesta se guardó pero falló la IA.</p>
              <p className="text-sm font-body text-[#5A6472]">¿Desea publicar sin resumen o reintentar el análisis?</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleReintentar}
              disabled={isAnalizando}
              className="bg-[#C89A3C] hover:bg-[#b08735] text-[#14181F] font-body font-semibold px-4 py-2 rounded transition-colors"
            >
              Reintentar IA
            </button>
            <button
              onClick={handlePublicarAsi}
              disabled={isAnalizando}
              className="bg-transparent hover:bg-[#D6CFC0] text-[#5A6472] border border-[#5A6472] font-body font-semibold px-4 py-2 rounded transition-colors"
            >
              Publicar sin resumen
            </button>
          </div>
        </div>
      )}

      {paso === 'sugerencia' && (
        <SugerenciaIA
          resumen={resumenIa}
          onResumenChange={setResumenIa}
          interesesSugeridos={interesesSugeridos}
          onAceptar={handleAceptarSugerencia}
          onDescartar={handleDescartarSugerencia}
        />
      )}
    </div>
  )
}
