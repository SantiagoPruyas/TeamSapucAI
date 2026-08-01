'use client'

import { useState, useMemo } from 'react'
import type { Departamento } from '@/lib/types'

interface PasoIdentidadProps {
  departamentos: Departamento[]
  onSiguiente: (data: { dni: string; departamentoId: string }) => void
  onAnterior: () => void
}

/**
 * PasoIdentidad — Paso 2: DNI + departamento.
 * DNI: inputMode numeric, validación suave, error en criollo.
 * Departamento: selector buscable con los 25 de Corrientes.
 * Los campos van sobre tarjeta blanca flotante (dirección "El Puente").
 */
export function PasoIdentidad({ departamentos, onSiguiente, onAnterior }: PasoIdentidadProps) {
  const [dni, setDni] = useState('')
  const [dniError, setDniError] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [departamentoId, setDepartamentoId] = useState('')
  const [abierto, setAbierto] = useState(false)

  const departamentosFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase().trim()
    return q ? departamentos.filter(d => d.nombre.toLowerCase().includes(q)) : departamentos
  }, [departamentos, busqueda])

  const departamentoSeleccionado = departamentos.find(d => d.id === departamentoId)

  function validarDni(valor: string): string {
    if (!valor) return 'Ingresá tu DNI para continuar'
    if (!/^\d+$/.test(valor)) return 'El DNI solo tiene números, sin puntos ni espacios'
    if (valor.length < 7 || valor.length > 8) return 'El DNI tiene 7 u 8 números'
    return ''
  }

  function handleDniBlur() {
    setDniError(validarDni(dni))
  }

  function handleSiguiente() {
    const error = validarDni(dni)
    if (error) { setDniError(error); return }
    if (!departamentoId) return
    onSiguiente({ dni, departamentoId })
  }

  const puedeAvanzar = !validarDni(dni) && !!departamentoId

  return (
    <div className="flex flex-col flex-1 px-6 pt-4 pb-6 gap-6">
      {/* Título de sección — Headline, no Display (ya se usó en paso 1) */}
      <div>
        <h2 className="t-headline text-indigo-campo">
          Contanos quién sos
        </h2>
        <p className="t-body text-tinta-tenue mt-2 text-[0.9375rem]">
          Solo para saber que sos correntino/a.
        </p>
      </div>

      {/* Tarjeta blanca flotante — todos los campos viven acá */}
      <div className="tarjeta-blanca flex flex-col gap-5">
        {/* DNI */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="input-dni"
            className="t-label text-tinta-tenue"
          >
            Número de DNI
          </label>
          <input
            id="input-dni"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={8}
            value={dni}
            onChange={e => {
              const v = e.target.value.replace(/\D/g, '')
              setDni(v)
              if (dniError) setDniError(validarDni(v))
            }}
            onBlur={handleDniBlur}
            placeholder="Ej: 32456789"
            aria-describedby={dniError ? 'dni-error' : undefined}
            aria-invalid={!!dniError}
            className={`h-12 w-full rounded-[14px] px-3.5 font-sans text-base outline-none bg-lienzo text-tinta transition-colors ${
              dniError ? 'border border-cochinilla' : 'border border-hilo focus:border-oro-filete'
            }`}
          />
          {dniError && (
            <p id="dni-error" className="t-label text-cochinilla tracking-normal normal-case text-[0.8125rem] font-sans font-normal">
              {dniError}
            </p>
          )}
        </div>

        {/* Departamento — selector buscable */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="btn-departamento"
            className="t-label text-tinta-tenue"
          >
            Departamento
          </label>
          <div className="relative">
            <button
              id="btn-departamento"
              type="button"
              onClick={() => setAbierto(!abierto)}
              aria-haspopup="listbox"
              aria-expanded={abierto}
              className={`h-12 w-full rounded-[14px] px-3.5 font-sans text-base text-left flex items-center justify-between border border-hilo bg-lienzo cursor-pointer ${
                departamentoSeleccionado ? 'text-tinta' : 'text-tinta-tenue'
              }`}
            >
              <span>{departamentoSeleccionado?.nombre ?? 'Elegí tu departamento'}</span>
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                style={{ transform: abierto ? 'rotate(180deg)' : 'none', transition: 'transform 150ms', flexShrink: 0 }}
                aria-hidden
              >
                <path d="M4 6l4 4 4-4" stroke="var(--tinta-tenue)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {abierto && (
              <div
                role="listbox"
                aria-label="Departamentos de Corrientes"
                className="absolute top-full left-0 right-0 z-50 bg-lienzo-hueso border border-hilo border-t-0 rounded-b-[14px] max-h-60 overflow-y-auto sombra-suave"
              >
                {/* Campo de búsqueda */}
                <div className="p-2 px-3 border-b border-hilo">
                  <input
                    type="text"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    placeholder="Buscar..."
                    aria-label="Buscar departamento"
                    className="w-full h-9 bg-lienzo text-tinta border border-hilo rounded-[10px] px-3 font-sans text-[0.9375rem] outline-none"
                  />
                </div>

                {departamentosFiltrados.length === 0 ? (
                  <div className="p-4 text-tinta-tenue font-sans text-[0.9375rem]">
                    No encontramos ese departamento
                  </div>
                ) : (
                  departamentosFiltrados.map(d => (
                    <button
                      key={d.id}
                      role="option"
                      aria-selected={d.id === departamentoId}
                      onClick={() => {
                        setDepartamentoId(d.id)
                        setBusqueda('')
                        setAbierto(false)
                      }}
                      className={`block w-full text-left py-3 px-3.5 font-sans text-[0.9375rem] text-tinta cursor-pointer transition-colors border-l-[3px] ${
                        d.id === departamentoId ? 'bg-lienzo border-indigo-campo' : 'border-transparent hover:bg-lienzo'
                      }`}
                    >
                      {d.nombre}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <p className="t-label text-gris-pizarra border-t border-hilo pt-3 tracking-normal normal-case text-xs font-sans font-normal">
          datos de demostración
        </p>
      </div>

      {/* Botones de navegación */}
      <div className="mt-auto flex gap-3">
        <button
          onClick={onAnterior}
          className="h-13 w-13 shrink-0 rounded-full flex items-center justify-center border border-indigo-campo text-indigo-campo cursor-pointer"
          aria-label="Volver al paso anterior"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          id="btn-identidad-siguiente"
          onClick={handleSiguiente}
          disabled={!puedeAvanzar}
          title={!puedeAvanzar ? 'Completá el DNI y elegí tu departamento para continuar' : undefined}
          className={`h-13 flex-1 rounded-full font-display font-semibold text-[0.8125rem] tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${
            puedeAvanzar
              ? 'bg-indigo-campo text-blanco-cosido sombra-boton cursor-pointer'
              : 'bg-hilo text-tinta-tenue cursor-not-allowed'
          }`}
        >
          Seguir
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {!puedeAvanzar && (dni || departamentoId) && (
        <p className="t-label text-gris-pizarra text-center tracking-normal normal-case text-[0.8125rem] font-sans font-normal -mt-2">
          {!validarDni(dni) ? 'Elegí tu departamento para continuar' : 'Completá tu DNI para continuar'}
        </p>
      )}
    </div>
  )
}
