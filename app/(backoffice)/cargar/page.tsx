'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'
import { pedirSugerenciaIA } from '@/lib/mock/api.backoffice'
import { SugerenciaIA } from '@/components/backoffice/SugerenciaIA'

export default function CargaDePropuestaMockup() {
  const router = useRouter()

  const [titulo, setTitulo] = useState('Proyecto de Ley para la Promoción de la Salud Mental en Escuelas')
  const [texto, setTexto] = useState('ARTÍCULO 1º.- Créase el Programa Provincial de Promoción de la Salud Mental en el Ámbito Educativo...')

  const [resumen, setResumen] = useState('')
  const [interesesSugeridos, setInteresesSugeridos] = useState<string[]>([])
  const [sugerenciaLista, setSugerenciaLista] = useState(false)
  const [sugerenciaAprobada, setSugerenciaAprobada] = useState(false)

  const [isAnalizando, setIsAnalizando] = useState(false)
  const [publicado, setPublicado] = useState(false)

  const handleAnalizar = async () => {
    setIsAnalizando(true)
    try {
      const sug = await pedirSugerenciaIA(texto)
      setResumen(sug.resumenIa)
      setInteresesSugeridos(sug.interesesSugeridos)
      setSugerenciaLista(true)
      setSugerenciaAprobada(false)
    } catch (e) {
      console.error(e)
    } finally {
      setIsAnalizando(false)
    }
  }

  const handleAceptarSugerencia = () => {
    setSugerenciaAprobada(true)
  }

  const handleDescartarSugerencia = () => {
    setSugerenciaLista(false)
    setSugerenciaAprobada(false)
    setResumen('')
    setInteresesSugeridos([])
  }

  const handleGuardar = async () => {
    setPublicado(true)
    setTimeout(() => {
      router.push('/panel/p02')
    }, 1500)
  }

  if (publicado) {
    return (
      <div className="bg-lienzo-hueso p-8 rounded shadow text-center h-[600px] flex flex-col justify-center">
        <CheckCircle2 size={48} style={{ color: 'var(--verde-bandera)' }} className="mx-auto mb-4" />
        <h2 className="t-title text-tinta mb-2">Propuesta Publicada</h2>
        <p className="t-body text-tinta-tenue">Redirigiendo al panel...</p>
      </div>
    )
  }

  return (
    <div className="bg-lienzo-hueso rounded shadow-sm min-h-screen">
      <div className="border-b border-hilo px-8 py-6 flex justify-between items-center">
        <h1 className="t-title text-tinta">Carga de propuesta</h1>
        <span className="t-label text-tinta-tenue">Paso 1 de 3</span>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Izquierda: Inputs */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block t-label text-tinta-tenue mb-2">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full bg-white border border-hilo rounded p-3 t-body text-tinta focus:ring-1 focus:ring-oro-filete outline-none"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block t-label text-tinta-tenue mb-2">Texto del proyecto</label>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="w-full flex-1 min-h-[300px] bg-white border border-hilo rounded p-3 t-body text-tinta resize-none focus:ring-1 focus:ring-oro-filete outline-none"
            />
          </div>

          <button
            onClick={handleAnalizar}
            disabled={isAnalizando}
            className="self-start px-6 py-2.5 rounded t-label text-blanco-cosido bg-indigo-campo hover:bg-indigo-nocturno transition-colors disabled:opacity-60"
          >
            {isAnalizando ? 'Analizando con IA...' : 'Pedir sugerencia de IA'}
          </button>
        </div>

        {/* Derecha: IA */}
        <div className="flex flex-col gap-6">
          {sugerenciaLista ? (
            <SugerenciaIA
              resumen={resumen}
              onResumenChange={setResumen}
              interesesSugeridos={interesesSugeridos}
              onAceptar={handleAceptarSugerencia}
              onDescartar={handleDescartarSugerencia}
            />
          ) : (
            <div className="panel-lienzo p-6 flex-1 flex items-center justify-center text-center">
              <p className="t-body text-tinta-tenue">
                Pedí la sugerencia de IA para obtener un resumen en criollo y categorías propuestas. Vas a poder editarlo y aprobarlo antes de continuar.
              </p>
            </div>
          )}
          {sugerenciaAprobada && (
            <p className="t-label" style={{ color: 'var(--verde-bandera)' }}>
              Sugerencia aprobada — lista para publicar.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-hilo px-8 py-6 flex items-center justify-between bg-white mt-auto">
        <button className="px-6 py-2 border border-hilo rounded t-label text-tinta hover:bg-lienzo-hueso">
          Guardar borrador
        </button>
        <button
          onClick={handleGuardar}
          disabled={!sugerenciaAprobada}
          className="px-8 py-2 bg-indigo-campo text-blanco-cosido rounded t-label hover:bg-indigo-nocturno disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
