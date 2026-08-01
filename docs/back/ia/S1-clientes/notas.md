# S1I — Clientes de IA, runner de JSON y modo fake

## Qué se hizo

- `lib/ai/tipos.ts`: `ResultadoIA<T>`, `Moderacion`, `RespuestaChat`.
- `lib/ai/gemini.ts`: cliente único de `@google/genai` a nivel de módulo, `generarTexto` y
  `transcribir`. `temperature: 0` en las dos.
- `lib/ai/json.ts`: `parsearJSON` (extractor + validador Zod, puro y testeado) y `pedirJSON`
  (orquesta generarTexto → parsear → reintento con el error → parsear). Nunca tira: cualquier
  excepción de `generarTexto` se atrapa y se traduce a `{ ok: false, motivo }`.
- `lib/ai/json.test.ts` — TDD, cinco casos pedidos por el plan: JSON limpio, en bloque
  ` ```json `, con texto alrededor, inválido, y válido pero fuera de esquema. **Los cinco
  pasan** (`pnpm test`).
- `lib/ai/fake.ts`: `FAKE_AI=1` da salidas fijas y creíbles. `generarTexto` detecta por
  palabras clave en el prompt de sistema qué forma de JSON devolver (resumen, slugs,
  apto/postura, argumentos, fundado) para que los prompts de las próximas sesiones (S2I,
  S4I, S5I, S6I) funcionen bajo modo fake sin cambios.
- `app/api/dev/ia/route.ts`, con la guarda de producción.

## Bug encontrado y corregido durante la verificación

La primera versión de `app/api/dev/ia/route.ts` llamaba a `generarTexto` sin capturar
excepciones (es la única función "cruda": por contrato la envuelve `pedirJSON`, no ella
misma). Con `GEMINI_API_KEY` rota, esa ruta devolvía **500** — justo lo que VB-4 prohíbe.
Se corrigió agregando `medirGenerarTextoSeguro`, que atrapa el error igual que lo haría
`pedirJSON`. Verificado: con la key rota, la ruta ahora responde `200` con `ok: false` en
las tres funciones.

## Verificación (VB)

- **VB-6:** `pnpm tsc --noEmit` limpio.
- **`pnpm test`:** los 5 casos de `json.test.ts` pasan.
- **`/api/dev/ia` con `FAKE_AI=1`:** `ok: true` en las tres funciones, sin red.
- **`/api/dev/ia` con credenciales reales (`FAKE_AI=0`):** `generarTexto` y `pedirJSON`
  responden con un resumen en criollo real de Gemini (~4-5s cada uno). `transcribir` da
  `ok: false` porque el fixture de la ruta es texto plano, no un audio real — es el
  comportamiento esperado para un fixture falso, no un bug (el audio real se prueba recién
  en S4I con `lib/actions/sapucais-alta.ts` de por medio).
- **VB-4 (degradación, credenciales rotas):** `GEMINI_API_KEY=roto GEMINI_MODEL_ID=roto` →
  las tres funciones devuelven `ok: false` con el motivo del error de Gemini, **HTTP 200,
  cero excepciones sin atrapar** en la consola del servidor.
- **VB-5:** no aplica todavía (no hay build de producción en esta sesión; se audita en S7I/S8).
- Nota: `NEXT_PUBLIC_SUPABASE_URL/ANON_KEY` y `GEMINI_API_KEY` de `.env.local` ya estaban
  cargados con valores reales (`/api/dev/salud` daba `"gemini":"ok"` antes de esta sesión),
  así que se pudo probar contra Gemini real además de contra el modo fake.
