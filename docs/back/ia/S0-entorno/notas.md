# S0I — Credenciales, salud y deploy vacío

## Qué se hizo

1. **Verificado** que PROJECT.md y CLAUDE.md ya reflejaban la decisión "Gemini reemplaza a
   Amazon Transcribe" (§2 de PLAN-BACK.md) — ya estaba commiteado, no hizo falta editarlo.
2. **Hallazgo y fix de un bug de plan:** Next.js App Router trata cualquier carpeta con prefijo
   `_` (`app/api/_dev/**`) como "private folder" — no la rutea. Confirmado con una prueba real:
   la misma ruta bajo `app/api/devtest/salud` devolvía 200 y bajo `app/api/_dev/salud` devolvía
   404. Se corrigió la convención a `app/api/dev/**` en todo `PLAN-BACK.md` (reemplazo global) y
   se anotó en §14 (Bitácora de choques). Afecta a las rutas de prueba de ambos carriles.
3. Instaladas las dependencias necesarias para el chequeo de salud:
   `@aws-sdk/client-bedrock-runtime`, `@google/genai`, `@supabase/supabase-js`.
4. Creado `app/api/dev/salud/route.ts` con la guarda de producción (404 en `NODE_ENV=production`)
   y los cuatro chequeos: variables faltantes, Supabase (`count` sobre `interests`), Bedrock
   (`InvokeModelCommand` con `anthropic_version: bedrock-2023-05-31`), Gemini
   (`generateContent` con `gemini-flash-latest`).
5. Creados `.env.example` y `.env.local` (este último **no** commiteado, ya cubierto por la regla
   `.env*` de `.gitignore`).

## Evidencia

### VB-1 — `/api/dev/salud` con las credenciales reales disponibles

```json
{
  "supabase": "faltan variables",
  "bedrock": "faltan variables",
  "gemini": "ok",
  "faltantes": [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY"
  ],
  "fakeAi": false
}
```

Gemini responde `"ok"` con la key real. Supabase y Bedrock reportan `"faltan variables"` porque
**no tengo credenciales de AWS ni el proyecto Supabase todavía** (Supabase es S0D/S1D, de Agos;
las credenciales de AWS las tiene que cargar Santi en `.env.local` — ver "Pendiente" abajo).

### VB-4 — Degradación con credenciales rotas

Levantado con `GEMINI_API_KEY=roto BEDROCK_MODEL_ID=roto AWS_ACCESS_KEY_ID=roto
AWS_SECRET_ACCESS_KEY=roto`:

```json
{
  "supabase": "faltan variables",
  "bedrock": "The security token included in the request is invalid.",
  "gemini": "{\"error\":{\"code\":400,\"message\":\"API key not valid...\"}}",
  "faltantes": ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"],
  "fakeAi": false
}
```

**Cero errores 500, cero excepciones sin atrapar** en la consola del servidor (`GET
/api/dev/salud 200`). El endpoint degrada como pide la regla 5 de CLAUDE.md.

### VB-5 — Cero secretos en el cliente

```
$ pnpm build && grep -rl "SUPABASE_SERVICE_ROLE\|AWS_SECRET\|GEMINI_API_KEY" .next/static/
LIMPIO
```

### VB-6 — Tipos

```
$ pnpm tsc --noEmit
(sin salida — cero errores)
```

## Pendiente (no lo puedo hacer desde esta sesión)

- **Bedrock: habilitar el acceso a los modelos de Anthropic** en la consola de AWS
  (`us-east-1` → Bedrock → *Model access*) y cargar `AWS_ACCESS_KEY_ID` /
  `AWS_SECRET_ACCESS_KEY` reales en `.env.local`. Santi solo dijo que probablemente el modelo
  habilitado sea **Claude Sonnet 4.6** — `.env.example`/`.env.local` quedaron con
  `BEDROCK_MODEL_ID=anthropic.claude-sonnet-4-6` como default; hay que confirmarlo contra lo que
  realmente aparece habilitado en la consola.
- **AWS Amplify Hosting:** crear la app conectada al repo, apuntando a la rama `dev`, con las
  variables privadas cargadas. Es una acción de consola/CLI de AWS que no puedo ejecutar desde
  acá (no hay AWS CLI ni credenciales configuradas en este entorno). Queda para Santi.
- **Supabase:** URL/anon key/service role vienen de Agos en S0D — hasta que no las tenga, `supabase`
  en `/api/dev/salud` sigue en `"faltan variables"`.

## DoD — estado real (antes del pivot de proveedor, ver abajo)

- [x] `/api/dev/salud` responde con las 5 llaves esperadas, sin 500, con Gemini en verde
- [x] VB-4, VB-5, VB-6
- [ ] Deploy de Amplify existe con sus variables — **pendiente, acción manual del usuario**
- [x] `.env.local` no está en git (regla `.env*` de `.gitignore`, verificado)
- [x] PROJECT.md y CLAUDE.md ya decían Gemini (verificado, sin cambios necesarios)

---

## Addendum — pivot: el equipo no tiene acceso a Bedrock

Después de cerrar lo de arriba, Santi confirmó que **no nos dieron acceso a Amazon Bedrock** en
la cuenta de la hackatón. Cambio de decisión (documentado en PROJECT.md §15 y PLAN-BACK.md §2):
**Gemini pasa a hacer las seis tareas de IA del proyecto** (transcripción + los cinco prompts de
texto), no solo la transcripción. Bedrock queda completamente fuera del proyecto.

**Se deshizo/simplificó:**

- Se sacó `@aws-sdk/client-bedrock-runtime` del proyecto (`pnpm remove`).
- `app/api/dev/salud/route.ts` ya no chequea Bedrock — solo Supabase y Gemini.
- `.env.example` ya no tiene `AWS_REGION` / `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` /
  `BEDROCK_MODEL_ID`. Se agregó `GEMINI_MODEL_ID` (el modelo de Gemini se elige por variable).
- Reescritas en PLAN-BACK.md: §2 (reparto de proveedores), §5.5 (superficie `lib/ai/`), el
  catálogo de skills de §7 (`claude-api` pasa a "no se usa"), y las sesiones S0I, S1I, S2I, S3I,
  S4I, S5I, S6I, S7I — todas las menciones a Bedrock/Claude/`invocarClaude` quedaron reemplazadas
  por Gemini.
- CLAUDE.md y PROJECT.md actualizados (stack, regla 1, diagrama §6.1, bitácora §15).

**Verificación después del pivot:**

```
$ pnpm tsc --noEmit    → sin errores
$ pnpm build           → OK, /api/dev/salud sigue como ruta dinámica
$ grep -rl "SUPABASE_SERVICE_ROLE\|GEMINI_API_KEY" .next/static/ → LIMPIO
```

`/api/dev/salud` sin `GEMINI_MODEL_ID` en `.env.local` (el usuario todavía no lo agregó a mano):

```json
{
  "supabase": "faltan variables",
  "gemini": "faltan variables",
  "faltantes": ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY", "GEMINI_MODEL_ID"],
  "fakeAi": false
}
```

**Pendiente actualizado (acción del usuario, no la puedo hacer desde acá):**

- Agregar `GEMINI_MODEL_ID=gemini-flash-latest` a `.env.local` (y borrar las líneas viejas de AWS,
  ya no se usan — son inofensivas si quedan, pero no hacen nada).
- AWS Amplify Hosting sigue pendiente igual que antes — no depende de Bedrock, es hosting.
- Supabase sigue viniendo de Agos en S0D/S1D.
