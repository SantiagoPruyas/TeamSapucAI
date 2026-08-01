import type { ZodType } from 'zod'
import { generarTexto } from './gemini'
import type { ResultadoIA } from './tipos'

// Extrae el primer bloque `{...}` o `[...]` del texto, sacando los ``` que Gemini
// (como cualquier LLM) a veces le pone alrededor. Un solo extractor, usado por los cinco prompts.
function extraerCandidatoJSON(texto: string): string | null {
  const sinFences = texto.replace(/```json/gi, '```').split('```').join('\n')
  const inicio = sinFences.search(/[{[]/)
  if (inicio === -1) return null

  const abre = sinFences[inicio]
  const cierra = abre === '{' ? '}' : ']'
  let profundidad = 0
  for (let i = inicio; i < sinFences.length; i++) {
    if (sinFences[i] === abre) profundidad++
    else if (sinFences[i] === cierra) {
      profundidad--
      if (profundidad === 0) return sinFences.slice(inicio, i + 1)
    }
  }
  return null
}

// El corazón del carril IA. Extrae, valida con Zod, y nunca tira.
export function parsearJSON<T>(texto: string, esquema: ZodType<T>): ResultadoIA<T> {
  const candidato = extraerCandidatoJSON(texto)
  if (!candidato) return { ok: false, motivo: 'no se encontró JSON en la respuesta' }

  let json: unknown
  try {
    json = JSON.parse(candidato)
  } catch {
    return { ok: false, motivo: 'el JSON encontrado no es válido' }
  }

  const resultado = esquema.safeParse(json)
  if (!resultado.success) {
    return { ok: false, motivo: resultado.error.message }
  }
  return { ok: true, valor: resultado.data }
}

export async function pedirJSON<T>(
  esquema: ZodType<T>,
  p: { sistema: string; usuario: string }
): Promise<ResultadoIA<T>> {
  try {
    const primerIntento = await generarTexto(p)
    const primerResultado = parsearJSON(primerIntento, esquema)
    if (primerResultado.ok) return primerResultado

    const segundoIntento = await generarTexto({
      sistema: p.sistema,
      usuario: `${p.usuario}\n\nTu respuesta anterior no era JSON válido. El error fue: ${primerResultado.motivo}. Respondé solo el JSON, sin texto alrededor.`,
    })
    return parsearJSON(segundoIntento, esquema)
  } catch (e) {
    return { ok: false, motivo: e instanceof Error ? e.message : 'error desconocido' }
  }
}
