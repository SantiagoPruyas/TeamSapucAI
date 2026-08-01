'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getModoMock, setModoMock, ModoMock } from '../../lib/mock/state'
import { Rol } from '../../lib/types'

export function DevSwitcher() {
  const router = useRouter()
  const [modo, setModo] = useState<ModoMock>('ok')
  const [rol, setRol] = useState<Rol>('ciudadano')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setModo(getModoMock())
    const savedRol = localStorage.getItem('sapucai:rol') as Rol | null
    if (savedRol) setRol(savedRol)
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Solo se muestra en modo mock
  if (process.env.NEXT_PUBLIC_MOCK !== '1') return null

  const handleModoChange = (m: ModoMock) => {
    setModo(m)
    setModoMock(m)
    router.refresh()
  }

  const handleRolChange = (r: Rol) => {
    setRol(r)
    localStorage.setItem('sapucai:rol', r)
    router.refresh()
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 p-3 bg-white border border-neutral-200 rounded-lg shadow-lg text-xs font-sans text-neutral-800">
      <div className="font-bold text-indigo-700 mb-1">DevSwitcher</div>
      
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-neutral-500">Rol</label>
        <select 
          value={rol} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleRolChange(e.target.value as Rol)}
          className="border rounded p-1"
        >
          <option value="ciudadano">Ciudadano</option>
          <option value="equipo_camara">Equipo Cámara</option>
          <option value="diputado">Diputado</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-semibold text-neutral-500">Modo API</label>
        <select 
          value={modo} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleModoChange(e.target.value as ModoMock)}
          className="border rounded p-1"
        >
          <option value="ok">Ok (Rápido)</option>
          <option value="lento">Lento (x6 + jitter)</option>
          <option value="vacio">Vacío (Sin datos)</option>
          <option value="error">Error (Falla red)</option>
        </select>
      </div>
    </div>
  )
}
