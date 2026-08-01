/**
 * lib/ai/prompts/resumen.ts — Santiago
 *
 * Prompt de UNA sola tarea: resumir una propuesta legislativa en lenguaje
 * llano y sugerir intereses del catálogo cerrado. No hace nada más.
 */

import type { Interes } from '../../types'
import { generarJson } from '../gemini'

export type ResultadoResumen = {
  resumenIa: string
  interesesSugeridos: string[]
}

function armarPrompt(textoOriginal: string, catalogo: Interes[]): string {
  const listaCatalogo = catalogo.map(i => `- ${i.id}: ${i.nombre} (${i.slug})`).join('\n')

  return `Sos un asistente que ayuda a la Cámara de Diputados de Corrientes a explicarle
propuestas legislativas al ciudadano común, en lenguaje llano y neutral.

Tarea: a partir del texto original de un proyecto de ley, generá:
1. Un resumen breve (2 a 4 oraciones) en español rioplatense/correntino, sin
   tecnicismos legales, que cualquier persona pueda entender.
2. Una lista de 1 a 3 ids de intereses que mejor describen de qué trata la
   propuesta, elegidos EXCLUSIVAMENTE de este catálogo cerrado (no inventes
   ids nuevos, no uses otros nombres):

${listaCatalogo}

Texto original del proyecto de ley:
"""
${textoOriginal}
"""

Devolvé únicamente un JSON con esta forma exacta:
{"resumenIa": string, "interesesSugeridos": string[]}`
}

const schema = {
  type: 'object',
  properties: {
    resumenIa: { type: 'string' },
    interesesSugeridos: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['resumenIa', 'interesesSugeridos'],
}

/**
 * Genera el resumen + intereses sugeridos, validando que los ids sugeridos
 * pertenezcan al catálogo cerrado pasado como parámetro. Cualquier id
 * inventado por la IA se descarta.
 */
export async function generarResumen(
  textoOriginal: string,
  catalogo: Interes[]
): Promise<ResultadoResumen> {
  const prompt = armarPrompt(textoOriginal, catalogo)
  const resultado = await generarJson(prompt, schema)

  const idsValidos = new Set(catalogo.map(i => i.id))
  const interesesSugeridos = Array.isArray(resultado?.interesesSugeridos)
    ? resultado.interesesSugeridos.filter((id: unknown) => typeof id === 'string' && idsValidos.has(id))
    : []

  const resumenIa = typeof resultado?.resumenIa === 'string'
    ? resultado.resumenIa
    : ''

  if (!resumenIa) {
    throw new Error('Gemini no devolvió un resumenIa válido')
  }

  return { resumenIa, interesesSugeridos }
}
