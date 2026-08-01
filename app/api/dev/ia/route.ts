import { NextResponse } from 'next/server'
import { z } from 'zod'
import { generarTexto, transcribir } from '@/lib/ai/gemini'
import { pedirJSON } from '@/lib/ai/json'

// Ejercita las piezas base del carril IA (S1I) contra un fixture fijo, con y sin FAKE_AI.
// La columna `ms` importa: si un prompt tarda 12 segundos, mejor saberlo hoy que en la demo.
const FIXTURE_AUDIO_MIME = 'audio/webm'

async function medir<T>(fn: () => Promise<T>): Promise<{ salida: T; ms: number }> {
  const inicio = Date.now()
  const salida = await fn()
  return { salida, ms: Date.now() - inicio }
}

// generarTexto es la única función "cruda" del carril: por contrato, quien la usa en
// producción es siempre pedirJSON, que la envuelve en un try/catch. Esta ruta la ejercita
// también directamente para medirla, así que reproduce esa misma protección acá.
async function medirGenerarTextoSeguro(p: { sistema: string; usuario: string }) {
  const inicio = Date.now()
  try {
    const salida = await generarTexto(p)
    return { ok: true, salida, ms: Date.now() - inicio }
  } catch (e) {
    return {
      ok: false,
      salida: e instanceof Error ? e.message : 'error desconocido',
      ms: Date.now() - inicio,
    }
  }
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('No encontrado', { status: 404 })
  }

  const resultados: Array<{ funcion: string; ok: boolean; salida: unknown; ms: number }> = []

  const generar = await medirGenerarTextoSeguro({
    sistema: 'Sos un asistente que resume proyectos de ley en criollo. Devolvé JSON: { "resumen": string }.',
    usuario: 'Texto de prueba de un proyecto de ley sobre agua potable rural.',
  })
  resultados.push({ funcion: 'generarTexto', ok: generar.ok, salida: generar.salida, ms: generar.ms })

  const json = await medir(() =>
    pedirJSON(z.object({ resumen: z.string() }), {
      sistema: 'Sos un asistente que resume proyectos de ley en criollo. Devolvé JSON: { "resumen": string }.',
      usuario: 'Texto de prueba de un proyecto de ley sobre agua potable rural.',
    })
  )
  resultados.push({
    funcion: 'pedirJSON',
    ok: json.salida.ok,
    salida: json.salida,
    ms: json.ms,
  })

  const audioFixture = Buffer.from('fixture de audio, no es un archivo real', 'utf-8')
  const transcripcion = await medir(() => transcribir(audioFixture, FIXTURE_AUDIO_MIME))
  resultados.push({
    funcion: 'transcribir',
    ok: transcripcion.salida.ok,
    salida: transcripcion.salida,
    ms: transcripcion.ms,
  })

  return NextResponse.json({
    fakeAi: process.env.FAKE_AI === '1',
    resultados,
  })
}
