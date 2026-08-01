'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Progreso } from '@/components/citizen/Progreso'
import { PasoBienvenida } from '@/components/citizen/PasoBienvenida'
import { PasoIdentidad } from '@/components/citizen/PasoIdentidad'
import { PasoIntereses } from '@/components/citizen/PasoIntereses'
import { getIntereses, getDepartamentos, guardarPerfil } from '@/lib/mock/api.citizen'
import type { Interes, Departamento } from '@/lib/types'

type EstadoCarga = 'cargando' | 'ok' | 'error'
type PasoActual = 1 | 2 | 3

/**
 * Onboarding — orquesta los 3 pasos del registro.
 *
 * Estados diseñados (Regla de los 4 estados):
 * - ok: flujo normal
 * - cargando: skeleton en el paso de intereses
 * - error: mensaje en criollo que ofrece reintentar
 * - vacio: no aplica acá (los catálogos siempre tienen datos reales)
 */
export default function OnboardingPage() {
  const router = useRouter()
  const [paso, setPaso] = useState<PasoActual>(1)
  const [estado, setEstado] = useState<EstadoCarga>('cargando')

  const [intereses, setIntereses] = useState<Interes[]>([])
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])

  // Datos acumulados entre pasos
  const [datosDni, setDatosDni] = useState<{ dni: string; departamentoId: string } | null>(null)

  useEffect(() => {
    async function cargar() {
      try {
        setEstado('cargando')
        const [int, dep] = await Promise.all([getIntereses(), getDepartamentos()])
        setIntereses(int)
        setDepartamentos(dep)
        setEstado('ok')
      } catch {
        setEstado('error')
      }
    }
    cargar()
  }, [])

  async function handleFinalizar(interesesSeleccionados: string[]) {
    if (!datosDni) return
    try {
      await guardarPerfil({
        rol: 'ciudadano',
        nombre: '',
        dni: datosDni.dni,
        departamentoId: datosDni.departamentoId,
        intereses: interesesSeleccionados,
      })
      router.push('/feed')
    } catch {
      // No bloquear: el mock no persistirá pero el flujo de demo continúa
      router.push('/feed')
    }
  }

  // ---- Estado: Error al cargar catálogos ----
  if (estado === 'error') {
    return (
      <div className="flex flex-col min-h-screen bg-lienzo-hueso">
        <div className="flex flex-col flex-1 items-center justify-center px-6 gap-6">
          <div className="tarjeta-blanca w-full max-w-sm flex flex-col gap-4">
            <h2 className="t-title text-tinta">
              Algo salió mal
            </h2>
            <p className="t-body text-tinta-tenue">
              No pudimos conectarnos para traer los datos. Puede ser la señal o algo momentáneo.
            </p>
          </div>
          <button
            id="btn-reintentar-onboarding"
            onClick={() => window.location.reload()}
            className="w-full max-w-sm h-13 rounded-full bg-indigo-campo text-blanco-cosido sombra-boton font-display font-semibold text-[0.8125rem] tracking-widest uppercase cursor-pointer"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  // ---- Flujo normal (loading + ok) ----
  return (
    <div className="flex flex-col min-h-screen bg-lienzo-hueso">
      {/* Barra de progreso */}
      <Progreso paso={paso} />

      {/* Contenido del paso actual */}
      {paso === 1 && (
        <PasoBienvenida onSiguiente={() => setPaso(2)} />
      )}

      {paso === 2 && (
        <PasoIdentidad
          departamentos={estado === 'cargando' ? [] : departamentos}
          onSiguiente={data => {
            setDatosDni(data)
            setPaso(3)
          }}
          onAnterior={() => setPaso(1)}
        />
      )}

      {paso === 3 && (
        <PasoIntereses
          intereses={intereses}
          cargando={estado === 'cargando'}
          onFinalizar={handleFinalizar}
          onAnterior={() => setPaso(2)}
        />
      )}
    </div>
  )
}
