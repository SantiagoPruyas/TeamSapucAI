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
 * Los campos van sobre panel de Lienzo (Regla del Lienzo).
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
        <h2 className="t-headline" style={{ color: '#FBFAF7' }}>
          Contanos quién sos
        </h2>
        <p className="t-body" style={{ color: 'rgba(251,250,247,0.6)', marginTop: '0.5rem', fontSize: '0.9375rem' }}>
          Solo para saber que sos correntino/a.
        </p>
      </div>

      {/* Panel de lienzo — todos los campos viven acá */}
      <div className="panel-lienzo flex flex-col gap-5">
        {/* DNI */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="input-dni"
            className="t-label"
            style={{ color: '#5A6472' }}
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
            style={{
              height: '48px',
              backgroundColor: '#FBFAF7',
              color: '#14181F',
              border: dniError
                ? '1px solid #A82418'
                : '1px solid #D6CFC0',
              borderRadius: '2px',
              padding: '0 0.875rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 150ms',
              width: '100%',
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = '#C89A3C'
            }}
            onBlurCapture={e => {
              if (!dniError) e.currentTarget.style.borderColor = '#D6CFC0'
            }}
          />
          {dniError && (
            <p id="dni-error" className="t-label" style={{ color: '#A82418', letterSpacing: '0', textTransform: 'none', fontSize: '0.8125rem', fontFamily: 'var(--font-sans)', fontWeight: 400 }}>
              {dniError}
            </p>
          )}
        </div>

        {/* Departamento — selector buscable */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="btn-departamento"
            className="t-label"
            style={{ color: '#5A6472' }}
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
              style={{
                height: '48px',
                width: '100%',
                backgroundColor: '#FBFAF7',
                color: departamentoSeleccionado ? '#14181F' : '#5A6472',
                border: '1px solid #D6CFC0',
                borderRadius: '2px',
                padding: '0 0.875rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <span>{departamentoSeleccionado?.nombre ?? 'Elegí tu departamento'}</span>
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                style={{ transform: abierto ? 'rotate(180deg)' : 'none', transition: 'transform 150ms', flexShrink: 0 }}
                aria-hidden
              >
                <path d="M4 6l4 4 4-4" stroke="#5A6472" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {abierto && (
              <div
                role="listbox"
                aria-label="Departamentos de Corrientes"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 50,
                  backgroundColor: '#FBFAF7',
                  border: '1px solid #D6CFC0',
                  borderTop: 'none',
                  borderRadius: '0 0 2px 2px',
                  maxHeight: '240px',
                  overflowY: 'auto',
                }}
              >
                {/* Campo de búsqueda */}
                <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #D6CFC0' }}>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    placeholder="Buscar..."
                    aria-label="Buscar departamento"
                    style={{
                      width: '100%',
                      height: '36px',
                      backgroundColor: '#EFEBE2',
                      color: '#14181F',
                      border: '1px solid #D6CFC0',
                      borderRadius: '2px',
                      padding: '0 0.75rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      outline: 'none',
                    }}
                  />
                </div>

                {departamentosFiltrados.length === 0 ? (
                  <div style={{ padding: '1rem', color: '#5A6472', fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}>
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
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.75rem 0.875rem',
                        textAlign: 'left',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9375rem',
                        color: '#14181F',
                        backgroundColor: d.id === departamentoId ? '#EFEBE2' : 'transparent',
                        borderTop: 'none',
                        borderRight: 'none',
                        borderBottom: 'none',
                        borderLeft: d.id === departamentoId ? '3px solid #17264A' : '3px solid transparent',
                        cursor: 'pointer',
                        transition: 'background-color 100ms',
                      }}
                    >
                      {d.nombre}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <p className="t-label" style={{ color: '#77808F', borderTop: '1px solid #D6CFC0', paddingTop: '0.75rem', letterSpacing: '0', textTransform: 'none', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 400 }}>
          datos de demostración
        </p>
      </div>

      {/* Botones de navegación */}
      <div className="mt-auto flex gap-3">
        <button
          onClick={onAnterior}
          style={{
            height: '52px',
            flex: '0 0 auto',
            width: '52px',
            backgroundColor: 'transparent',
            color: '#FBFAF7',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
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
          style={{
            height: '52px',
            flex: 1,
            backgroundColor: puedeAvanzar ? '#EFEBE2' : 'rgba(239,235,226,0.15)',
            color: puedeAvanzar ? '#14181F' : 'rgba(251,250,247,0.4)',
            border: `1px solid ${puedeAvanzar ? '#C89A3C' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '2px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: puedeAvanzar ? 'pointer' : 'not-allowed',
            transition: 'all 150ms',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          Seguir
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {!puedeAvanzar && (dni || departamentoId) && (
        <p className="t-label" style={{ color: '#77808F', textAlign: 'center', letterSpacing: 0, textTransform: 'none', fontSize: '0.8125rem', fontFamily: 'var(--font-sans)', fontWeight: 400, marginTop: '-0.5rem' }}>
          {!validarDni(dni) ? 'Elegí tu departamento para continuar' : 'Completá tu DNI para continuar'}
        </p>
      )}
    </div>
  )
}
