export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { generarResumen } from '@/lib/ai/prompts/resumen'
import { intereses } from '@/lib/mock/data'

export async function POST(req: NextRequest) {
  let texto = ''
  try {
    const body = await req.json()
    texto = typeof body?.texto === 'string' ? body.texto : ''
  } catch (err) {
    console.error('[api/ia/resumen] body inválido', err)
  }

  try {
    if (!texto) {
      throw new Error('texto vacío')
    }

    const resultado = await generarResumen(texto, intereses)

    return NextResponse.json(
      { ...resultado, fuente: 'gemini' },
      { status: 200 }
    )
  } catch (err) {
    console.error('[api/ia/resumen] fallback a mock:', err)

    // Mismo shape que pedirSugerenciaIA en lib/mock/api.backoffice.ts
    const sugeridos = intereses.slice(0, Math.floor(Math.random() * 3) + 1).map(i => i.id)

    return NextResponse.json(
      {
        resumenIa:
          'Esta es una síntesis generada por la IA que resume el proyecto de ley para facilitar su comprensión al ciudadano.',
        interesesSugeridos: sugeridos,
        fuente: 'mock',
      },
      { status: 200 }
    )
  }
}
