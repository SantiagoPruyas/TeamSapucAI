import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { createClient } from '@supabase/supabase-js'

const VARIABLES_REQUERIDAS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'GEMINI_API_KEY',
  'GEMINI_MODEL_ID',
] as const

async function chequearSupabase(): Promise<string> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) return 'faltan variables'
  try {
    const supabase = createClient(url, anonKey)
    const { error } = await supabase.from('interests').select('*', { count: 'exact', head: true })
    if (error) return error.message
    return 'ok'
  } catch (e) {
    return e instanceof Error ? e.message : 'error desconocido'
  }
}

async function chequearGemini(): Promise<string> {
  const modelId = process.env.GEMINI_MODEL_ID
  if (!process.env.GEMINI_API_KEY || !modelId) return 'faltan variables'
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    await ai.models.generateContent({
      model: modelId,
      contents: 'Decí solo: ok',
    })
    return 'ok'
  } catch (e) {
    return e instanceof Error ? e.message : 'error desconocido'
  }
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('No encontrado', { status: 404 })
  }

  const faltantes = VARIABLES_REQUERIDAS.filter((v) => !process.env[v])

  const [supabase, gemini] = await Promise.all([chequearSupabase(), chequearGemini()])

  return NextResponse.json({
    supabase,
    gemini,
    faltantes,
    fakeAi: process.env.FAKE_AI === '1',
  })
}
