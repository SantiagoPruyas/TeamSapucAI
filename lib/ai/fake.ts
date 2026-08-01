import type { ResultadoIA } from './tipos'

// Salidas fijas y creíbles para cuando FAKE_AI=1. Existe por tres razones (§5.5 de
// PLAN-BACK.md): Agos puede construir su carril sin esperar la key de Gemini, el pipeline
// entero se prueba en dos segundos, y si Gemini se cae durante la demo, el deploy sigue
// funcionando con FAKE_AI=1.
//
// generarTexto no sabe qué prompt lo llama (es genérico), así que estas heurísticas miran
// el texto del prompt de sistema para devolver la forma de JSON que cada prompt espera.
// Cada prompt (resumir.ts, categorizar.ts, etc.) valida igual con Zod, así que si el fake
// no calza con el esquema, el problema se ve enseguida en /api/dev/ia.

export async function generarTexto(p: { sistema: string; usuario: string }): Promise<string> {
  const s = p.sistema.toLowerCase()

  if (s.includes('resumen') || s.includes('resumir')) {
    return JSON.stringify({
      resumen:
        'Este proyecto busca mejorar un servicio público en Corrientes. Si se aprueba, cambia cómo el Estado atiende a la gente en ese tema, con plazos concretos para que se note.',
    })
  }

  if (s.includes('slug') || s.includes('categoriz')) {
    return JSON.stringify({ slugs: ['salud', 'obras-publicas'] })
  }

  if (s.includes('apto') && s.includes('postura')) {
    return JSON.stringify({ apto: true, motivo: '', postura: 'a_favor' })
  }

  if (s.includes('argumento')) {
    return JSON.stringify({
      argumentos: [
        { texto: 'La gente pide que esto se implemente rápido.', personas: 12, postura: 'a_favor' },
        { texto: 'Hay dudas sobre si alcanza el presupuesto.', personas: 5, postura: 'en_contra' },
        { texto: 'Falta que se explique bien cómo se va a controlar.', personas: 3, postura: 'neutro' },
      ],
    })
  }

  if (s.includes('fundado')) {
    return JSON.stringify({
      texto: 'Eso no lo dice el proyecto.',
      fundado: false,
    })
  }

  return JSON.stringify({ ok: true })
}

export async function transcribir(): Promise<ResultadoIA<string>> {
  return {
    ok: true,
    valor:
      'Y bueno, yo quería decir que me parece bien el proyecto este, sobre todo para los que vivimos ' +
      'un poco más lejos del centro, porque a veces uno se queda esperando y no llega ayuda a tiempo. ' +
      'Ojalá se cumpla lo que dice, nomás.',
  }
}
