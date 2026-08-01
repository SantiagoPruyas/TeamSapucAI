/**
 * lib/ai/gemini.ts — Santiago
 *
 * Cliente fino sobre @google/genai. Vive SOLO en el server (Server Actions /
 * Route Handlers con runtime = 'nodejs'). Nunca importar desde un componente
 * cliente: la API key no puede tocar el navegador.
 */

import { GoogleGenAI } from '@google/genai'

const MODEL_ID = process.env.GEMINI_MODEL_ID || 'gemini-flash-latest'

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY no configurada')
  }
  return new GoogleGenAI({ apiKey })
}

/**
 * Pide a Gemini una salida JSON estructurada según `schema` (JSON Schema-like,
 * subset soportado por responseSchema). Si el SDK no puede usar responseSchema
 * por algún motivo, igual forzamos responseMimeType: 'application/json' y
 * parseamos el texto devuelto.
 */
export async function generarJson(prompt: string, schema: object): Promise<any> {
  const ai = getClient()

  const response = await ai.models.generateContent({
    model: MODEL_ID,
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: schema as any,
    },
  })

  const texto = response.text
  if (!texto) {
    throw new Error('Gemini no devolvió texto en la respuesta')
  }

  return JSON.parse(texto)
}

/**
 * Transcribe un audio (base64) a texto literal en español rioplatense/correntino.
 * El audio se manda como parte inline junto con un prompt corto.
 */
export async function transcribir(audioBase64: string, mime: string): Promise<string> {
  const ai = getClient()

  const response = await ai.models.generateContent({
    model: MODEL_ID,
    contents: [
      {
        role: 'user',
        parts: [
          {
            text:
              'Transcribí literalmente este audio en español rioplatense/correntino (es-AR). ' +
              'No agregues comentarios, aclaraciones ni resúmenes. Devolvé únicamente el texto ' +
              'hablado, tal cual se dijo.',
          },
          {
            inlineData: {
              data: audioBase64,
              mimeType: mime,
            },
          },
        ],
      },
    ],
  })

  const texto = response.text
  if (!texto) {
    throw new Error('Gemini no devolvió transcripción')
  }

  return texto.trim()
}
