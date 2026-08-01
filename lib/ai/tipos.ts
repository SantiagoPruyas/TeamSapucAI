// Ninguna función de lib/ai/** tira una excepción. Todas devuelven un ResultadoIA<T>
// que dice si salió bien o no — es la traducción concreta de "degradar, nunca explotar"
// (CLAUDE.md regla 5).
export type ResultadoIA<T> =
  | { ok: true; valor: T }
  | { ok: false; motivo: string } // motivo se guarda en la DB, nunca se muestra al ciudadano

export type Moderacion = {
  apto: boolean
  motivo: string // "" si apto
  postura: 'a_favor' | 'en_contra' | 'neutro'
}

// Tipo nuevo que el back necesita. Pedido a Malen para lib/types.ts (§13 de PLAN-BACK.md).
// Mientras tanto vive acá.
export type RespuestaChat = { texto: string; fundado: boolean }
