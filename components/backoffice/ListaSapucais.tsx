'use client'

import React, { useEffect, useState } from 'react'
import { Sapucai } from '@/lib/types'
import { getSapucais } from '@/lib/mock/api.backoffice'
import { FilaSapucai } from './FilaSapucai'

interface ListaSapucaisProps {
  propuestaId: string
}

export function ListaSapucais({ propuestaId }: ListaSapucaisProps) {
  const [sapucais, setSapucais] = useState<Sapucai[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let activo = true
    async function load() {
      setIsLoading(true)
      try {
        const data = await getSapucais(propuestaId)
        if (activo) setSapucais(data)
      } catch (e) {
        console.error(e)
      } finally {
        if (activo) setIsLoading(false)
      }
    }
    load()
    return () => {
      activo = false
    }
  }, [propuestaId])

  return (
    <div className="panel-lienzo p-6 flex flex-col">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="t-title text-tinta">Sapucais recibidos</h2>
        <span className="t-data text-tinta-tenue">{sapucais.length}</span>
      </div>

      {isLoading ? (
        <p className="t-body text-tinta-tenue">Cargando sapucais...</p>
      ) : sapucais.length === 0 ? (
        <p className="t-body text-tinta-tenue">Todavía no hay sapucais para esta propuesta.</p>
      ) : (
        <div className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-1">
          {sapucais.map(s => (
            <FilaSapucai key={s.id} sapucai={s} />
          ))}
        </div>
      )}
    </div>
  )
}
