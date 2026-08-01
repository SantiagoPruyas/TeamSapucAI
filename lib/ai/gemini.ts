import { GoogleGenAI } from '@google/genai'
import * as fake from './fake'
import type { ResultadoIA } from './tipos'

// Un solo cliente, instanciado una vez a nivel de módulo — en serverless, instanciar uno
// por llamada multiplica la latencia de handshake.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

function fakeAiActivo(): boolean {
  return process.env.FAKE_AI === '1'
}

// Junta sistema + usuario en el `contents` de generateContent: Gemini no tiene un rol de
// sistema separado del mismo modo que otros proveedores, así que el prompt de sistema va
// como primer bloque de texto. temperature: 0 en todo el proyecto: salidas parseables y
// reproducibles, no creativas.
export async function generarTexto(p: { sistema: string; usuario: string }): Promise<string> {
  if (fakeAiActivo()) return fake.generarTexto(p)

  const modelo = process.env.GEMINI_MODEL_ID
  if (!modelo) throw new Error('falta GEMINI_MODEL_ID')

  const respuesta = await ai.models.generateContent({
    model: modelo,
    contents: `${p.sistema}\n\n${p.usuario}`,
    config: { temperature: 0 },
  })

  const texto = respuesta.text
  if (!texto) throw new Error('Gemini no devolvió texto')
  return texto
}

// Transcribe audio en español rioplatense de Corrientes. Nunca tira: degrada a ResultadoIA.
export async function transcribir(audio: Buffer, mime: string): Promise<ResultadoIA<string>> {
  if (fakeAiActivo()) return fake.transcribir()

  try {
    const modelo = process.env.GEMINI_MODEL_ID
    if (!modelo) return { ok: false, motivo: 'falta GEMINI_MODEL_ID' }

    const respuesta = await ai.models.generateContent({
      model: modelo,
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: 'Transcribí este audio en español rioplatense de Corrientes, Argentina. Devolvé solo la transcripción, sin comentarios, sin comillas, sin encabezados.',
            },
            { inlineData: { mimeType: mime, data: audio.toString('base64') } },
          ],
        },
      ],
      config: { temperature: 0 },
    })

    const texto = respuesta.text
    if (!texto) return { ok: false, motivo: 'Gemini no devolvió una transcripción' }
    return { ok: true, valor: texto.trim() }
  } catch (e) {
    return { ok: false, motivo: e instanceof Error ? e.message : 'error desconocido' }
  }
}
