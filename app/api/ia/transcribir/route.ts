export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { transcribir } from '@/lib/ai/gemini'

export async function POST(req: NextRequest) {
  let audioBase64 = ''
  let mime = ''
  try {
    const body = await req.json()
    audioBase64 = typeof body?.audioBase64 === 'string' ? body.audioBase64 : ''
    mime = typeof body?.mime === 'string' ? body.mime : ''
  } catch (err) {
    console.error('[api/ia/transcribir] body inválido', err)
  }

  try {
    if (!audioBase64 || !mime) {
      throw new Error('audioBase64 o mime faltante')
    }

    const transcripcion = await transcribir(audioBase64, mime)

    if (!transcripcion) {
      throw new Error('transcripción vacía')
    }

    return NextResponse.json(
      { transcripcion, fuente: 'gemini' },
      { status: 200 }
    )
  } catch (err) {
    console.error('[api/ia/transcribir] fallback a mock:', err)

    return NextResponse.json(
      {
        transcripcion: 'Transcripción no disponible (modo demo sin conexión)',
        fuente: 'mock',
      },
      { status: 200 }
    )
  }
}
