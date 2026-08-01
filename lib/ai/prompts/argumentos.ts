/**
 * lib/ai/prompts/argumentos.ts — Santiago
 *
 * Prompt de UNA sola tarea: agrupar transcripciones de sapucais en 3-5
 * argumentos representativos. No hace nada más (ni moderación, ni postura
 * individual).
 */

import type { Argumento, Postura } from '../../types'
import { generarJson } from '../gemini'

const POSTURAS_VALIDAS: Postura[] = ['a_favor', 'en_contra', 'neutro']

function armarPrompt(transcripciones: string[]): string {
  const lista = transcripciones.map((t, i) => `${i + 1}. "${t}"`).join('\n')

  return `Sos un asistente que ayuda a la Cámara de Diputados de Corrientes a entender
la opinión ciudadana sobre una propuesta legislativa.

A continuación hay una lista de transcripciones de "sapucais" (notas de voz de
ciudadanos opinando sobre una propuesta):

${lista}

Tarea: agrupá estas opiniones en 3 a 5 argumentos representativos. Para cada
argumento devolvé:
- "texto": una síntesis breve del argumento (una oración).
- "personas": cuántas de las transcripciones de arriba corresponden a ese argumento.
- "postura": una de "a_favor", "en_contra" o "neutro".

Devolvé únicamente un JSON con esta forma exacta:
{"argumentos": [{"texto": string, "personas": number, "postura": "a_favor"|"en_contra"|"neutro"}]}`
}

const schema = {
  type: 'object',
  properties: {
    argumentos: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          texto: { type: 'string' },
          personas: { type: 'number' },
          postura: { type: 'string' },
        },
        required: ['texto', 'personas', 'postura'],
      },
    },
  },
  required: ['argumentos'],
}

/**
 * Genera 3-5 argumentos representativos a partir de transcripciones de
 * sapucais. Descarta cualquier entrada que no calce con el tipo Argumento.
 */
export async function generarArgumentosIA(transcripciones: string[]): Promise<Argumento[]> {
  const prompt = armarPrompt(transcripciones)
  const resultado = await generarJson(prompt, schema)

  const crudos = Array.isArray(resultado?.argumentos) ? resultado.argumentos : []

  const argumentos: Argumento[] = crudos
    .filter((a: any) =>
      a &&
      typeof a.texto === 'string' &&
      typeof a.personas === 'number' &&
      POSTURAS_VALIDAS.includes(a.postura)
    )
    .map((a: any) => ({
      texto: a.texto,
      personas: a.personas,
      postura: a.postura as Postura,
    }))

  if (argumentos.length === 0) {
    throw new Error('Gemini no devolvió argumentos válidos')
  }

  return argumentos
}
