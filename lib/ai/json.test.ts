import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { parsearJSON } from './json'

const esquema = z.object({ resumen: z.string() })

describe('parsearJSON', () => {
  it('acepta JSON limpio', () => {
    const r = parsearJSON('{"resumen": "hola"}', esquema)
    expect(r).toEqual({ ok: true, valor: { resumen: 'hola' } })
  })

  it('acepta JSON envuelto en un bloque de código ```json', () => {
    const texto = '```json\n{"resumen": "hola"}\n```'
    const r = parsearJSON(texto, esquema)
    expect(r).toEqual({ ok: true, valor: { resumen: 'hola' } })
  })

  it('acepta JSON con texto antes y después', () => {
    const texto = 'Acá está tu respuesta:\n{"resumen": "hola"}\nEspero que sirva.'
    const r = parsearJSON(texto, esquema)
    expect(r).toEqual({ ok: true, valor: { resumen: 'hola' } })
  })

  it('rechaza JSON inválido (no parsea)', () => {
    const r = parsearJSON('esto no es json ni tiene llaves', esquema)
    expect(r.ok).toBe(false)
  })

  it('rechaza JSON válido que no cumple el esquema', () => {
    const r = parsearJSON('{"otraCosa": 123}', esquema)
    expect(r.ok).toBe(false)
  })
})
