export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { generarArgumentosIA } from '@/lib/ai/prompts/argumentos'
import type { Argumento } from '@/lib/types'

export async function POST(req: NextRequest) {
  let transcripciones: string[] = []
  try {
    const body = await req.json()
    transcripciones = Array.isArray(body?.transcripciones)
      ? body.transcripciones.filter((t: unknown) => typeof t === 'string')
      : []
  } catch (err) {
    console.error('[api/ia/argumentos] body inválido', err)
  }

  try {
    if (transcripciones.length === 0) {
      throw new Error('transcripciones vacías')
    }

    const argumentos = await generarArgumentosIA(transcripciones)

    return NextResponse.json(
      { argumentos, fuente: 'gemini' },
      { status: 200 }
    )
  } catch (err) {
    console.error('[api/ia/argumentos] fallback a mock:', err)

    // Mismo shape que generarArgumentos en lib/mock/api.backoffice.ts
    const argumentos: Argumento[] = [
      { texto: 'Este proyecto es vital para nuestra comunidad', personas: 10, postura: 'a_favor' },
      { texto: 'Necesita más revisiones de presupuesto', personas: 4, postura: 'en_contra' },
      { texto: 'Podría beneficiar a algunos, pero perjudicar a otros', personas: 2, postura: 'neutro' },
    ]

    return NextResponse.json(
      { argumentos, fuente: 'mock' },
      { status: 200 }
    )
  }
}
