# PLAN MAESTRO DEL FRONT — Sapucái

> **Este archivo es el plan de trabajo del front. Solo front. Solo mock data.**
> Lo ejecutan dos personas, **Lara** y **Malen**, una sesión por vez, sin pisarse.
> La verdad de producto está en [PROJECT.md](PROJECT.md) y [PRODUCT.md](PRODUCT.md).
> La verdad visual está en [DESIGN.md](DESIGN.md). Este archivo dice **quién hace qué, cuándo,
> con qué skill, y cómo se prueba**.

---

## 0. Protocolo de arranque de sesión

**Cualquier modelo o persona que abra una sesión de trabajo en el front ejecuta estos 7 pasos, en
este orden, sin saltarse ninguno.**

1. **Leer, en este orden:** [PROJECT.md](PROJECT.md) → [DESIGN.md](DESIGN.md) → este archivo
   (`PLAN-FRONT.md`) → §11 (Registro de sesiones) para ver qué está hecho.
2. **Identificar de quién es la sesión.** Si tu nombre no está en la sesión, **no la ejecutes**.
   Ejecutá la primera sesión pendiente **de tu carril**.
3. `git pull origin front` y crear la rama que indica la sesión.
4. **Anunciar en voz alta** (en el chat, antes de tocar código):
   `"Sesión <N> — <título> — carril <ciudadano|backoffice> — skill: <skill que voy a invocar>"`.
5. **Invocar la skill que la sesión indica en su campo `SKILL`.** No improvisar otra. No construir
   UI sin invocarla.
6. Trabajar **solo sobre los archivos listados en `CREA / EDITA`**. Si necesitás tocar un archivo de
   la otra, ver §3.
7. **Cerrar la sesión:** correr el Protocolo VP (§6) completo → commit → merge a `front` → llenar la
   fila en §11.

### Cinco reglas que no se rompen nunca

1. **Nadie vuelve a correr el flujo de dirección visual de `impeccable`** (`new-work`,
   `concept-seed.mjs`, `serve-question.mjs`). La dirección ya está decidida y sellada: es
   **"El Estandarte"**, seed key `852e285a`. Está escrita en [DESIGN.md](DESIGN.md).
   Si una skill te ofrece elegir un mundo visual, la respuesta es: *ya está elegido, seguí DESIGN.md*.
2. **Nadie reescribe [DESIGN.md](DESIGN.md) ni [PRODUCT.md](PRODUCT.md) por su cuenta.** Un cambio
   ahí afecta a las dos. Se propone, se acuerda, y recién entonces se escribe (§3).
3. **Cero backend.** No se instala `@supabase/*`, no se instala `@aws-sdk/*`, no se escribe una
   Server Action que llame a un servicio real, no se toca `/supabase`. Todo dato sale de
   `/lib/mock`. Este plan termina donde empieza el backend.
4. **Todo dato visible es mock y se declara como tal.** Ningún número, nombre de diputado o cifra
   se presenta como real. Ver la última regla de §"Don'ts" de DESIGN.md.
5. **Toda pantalla tiene cuatro estados diseñados:** con datos, vacío, cargando y error. Una
   pantalla con un solo estado no está terminada. Es la consecuencia directa de "degradar, nunca
   explotar" (PRODUCT.md, principio 4).

---

## 1. Alcance de este plan

### Dentro

Las 8 pantallas de §11 de PROJECT.md, construidas contra mock data, navegables de punta a punta,
con sus cuatro estados cada una, en mobile y en escritorio, accesibles y animadas.

### Fuera (no se toca en ninguna sesión de este plan)

Supabase · Auth real · RLS · Gemini (transcripción) · Amazon Bedrock · los 5 prompts ·
Server Actions reales · `/supabase/migrations` · `seed.sql` · Amplify · Web Push ·
todo lo de la lista 🔴 de §9 de PROJECT.md.

### El objetivo real

Cuando este plan termine, el carril de IA y el de datos **enchufan sus funciones reales en lugar de
las de `/lib/mock/api.*.ts` y nada más cambia**. Por eso el contrato de mock data (§4) es la pieza
más importante del plan: si está bien hecho, el reemplazo es cambiar un import.

---

## 2. Territorios: quién es dueña de qué

| | **Lara — carril CIUDADANO** | **Malen — carril BACKOFFICE** |
|---|---|---|
| **Rutas** | `app/(citizen)/**` | `app/(backoffice)/**` |
| **Componentes** | `components/citizen/**` | `components/backoffice/**` |
| **Mock API** | `lib/mock/api.citizen.ts` | `lib/mock/api.backoffice.ts` |
| **Pruebas visuales** | `docs/visual/ciudadano/**` | `docs/visual/backoffice/**` |
| **Puerto local** | `3000` | `3001` |
| **Prefijo de rama** | `feat/ciudadano/...` | `feat/backoffice/...` |
| **Pantalla clave** | mobile 412×915 (el celular de la demo) | escritorio 1920×1080 (el proyector) |

### Archivos COMPARTIDOS (los toca una sola persona, y con aviso)

| Archivo | Dueña | Se congela después de |
|---|---|---|
| `app/globals.css` (tokens) | Lara | Sesión 1L |
| `app/layout.tsx` | Lara | Sesión 0 |
| `components/ui/**` (primitivos) | Lara | Sesión 1L |
| `app/diseno/page.tsx` (guía visual) | Lara | vive todo el proyecto |
| `lib/types.ts` | Malen | Sesión 1M |
| `lib/mock/data.ts` (fixtures) | Malen | Sesión 1M |
| `lib/mock/delay.ts`, `lib/mock/state.ts` | Malen | Sesión 1M |
| `components/dev/DevSwitcher.tsx` | Malen | Sesión 1M |
| `DESIGN.md`, `PRODUCT.md`, `PROJECT.md`, `PLAN-FRONT.md` | nadie sola | — |

---

## 3. Reglas de convivencia

**Git.** Rama por sesión, salida de `front`. Merge a `front` al cerrar la sesión, siempre.
`main` no se toca. Nunca se hace `rebase` de la rama de la otra ni `push --force` a `front`.

```bash
git checkout front && git pull origin front
git checkout -b feat/<carril>/<nombre-sesion>
# ... trabajo ...
git add -A && git commit -m "front(<carril>): <qué>"
git checkout front && git pull origin front && git merge --no-ff feat/<carril>/<nombre-sesion>
git push origin front
```

**Si necesitás un archivo del territorio de la otra:**

1. **No lo edites.** Escribí una línea en §12 (Bitácora de choques) describiendo qué necesitás.
2. Avisale por el canal del equipo.
3. Si es un primitivo de `components/ui/**` y no podés esperar: creá el componente **dentro de tu
   propia carpeta** con el sufijo `.local` (ej. `components/backoffice/TableLocal.tsx`), anotalo en
   §12, y en la sesión de integración (S8) se promueve a `components/ui/` una sola vez.
   **Duplicar y anotar es siempre preferible a editar el territorio de la otra.**
4. Si necesitás un campo nuevo en `lib/types.ts` o un fixture nuevo en `lib/mock/data.ts`: pedilo a
   Malen. Malen agrega **solo agregando** — nunca renombra ni borra un campo existente.

**Antes de cada sesión: `git pull`. Después de cada sesión: `merge` y `push`.** Una rama que vive
más de una sesión es un conflicto esperando.

---

## 4. Contrato de mock data

La UI **nunca** importa `data.ts` directamente. Importa siempre una función `async` de
`api.citizen.ts` o `api.backoffice.ts`. Esas funciones simulan latencia y pueden simular error.
Cuando llegue el backend real, se reescribe el cuerpo de esas funciones y **ninguna pantalla cambia**.

```
lib/
  types.ts              ← los tipos del dominio. Espejo de §10 de PROJECT.md.
  mock/
    delay.ts            ← sleep con jitter, y lectura del estado forzado
    state.ts            ← estado global de simulación (ok | vacio | lento | error)
    data.ts             ← los fixtures: ~20 propuestas, 25 departamentos, intereses, sapucais...
    api.citizen.ts      ← Lara
    api.backoffice.ts   ← Malen
```

### Tipos (`lib/types.ts`) — los escribe Malen en la Sesión 1M

```ts
export type Rol = 'ciudadano' | 'equipo_camara' | 'diputado'
export type Postura = 'a_favor' | 'en_contra' | 'neutro'
export type EstadoPropuesta = 'borrador' | 'procesando' | 'publicada' | 'cerrada'
export type EstadoProcesamiento = 'pendiente' | 'listo' | 'error'
export type TipoNotificacion = 'nueva_propuesta' | 'respuesta_diputado'

export type Interes = { id: string; slug: string; nombre: string; icono: string }
export type Departamento = { id: string; nombre: string }

export type Perfil = {
  id: string; rol: Rol; nombre: string; dni: string
  departamentoId: string; intereses: string[]
}

export type Propuesta = {
  id: string; titulo: string; textoOriginal: string
  resumenIa: string | null            // null = la IA todavía no corrió
  estado: EstadoPropuesta
  autorDiputado: { id: string; nombre: string; bloque: string }
  intereses: string[]                 // ids de Interes
  publicadaAt: string | null          // ISO
  totalSapucais: number
  termometro: { aFavor: number; enContra: number; neutro: number }  // absolutos, no %
  tieneRespuesta: boolean
}

export type Sapucai = {
  id: string; propuestaId: string
  autor: { nombre: string; departamento: string }   // mock: nombre de pila + depto
  audioUrl: string | null             // null = escribió en vez de grabar
  duracionSeg: number | null
  transcripcion: string | null        // null si estadoProcesamiento !== 'listo'
  postura: Postura | null
  moderacionOk: boolean | null        // null = pendiente de revisión humana
  moderacionMotivo: string | null
  estadoProcesamiento: EstadoProcesamiento
  createdAt: string
}

export type Argumento = { texto: string; personas: number; postura: Postura }

export type Respuesta = {
  id: string; propuestaId: string
  diputado: { id: string; nombre: string; bloque: string }
  texto: string; audioUrl: string | null; createdAt: string
}

export type Notificacion = {
  id: string; tipo: TipoNotificacion
  propuestaId: string; propuestaTitulo: string
  leida: boolean; createdAt: string
}
```

### Simulación de estados (`lib/mock/delay.ts` + `state.ts`)

```ts
// state.ts
export type ModoMock = 'ok' | 'vacio' | 'lento' | 'error'
// Se lee de localStorage('sapucai:mock'). El DevSwitcher lo escribe.

// delay.ts
export async function delay(ms = 450) { /* + jitter ±150ms; en modo 'lento' × 6 */ }
export function quizasFallar() { /* en modo 'error' tira new Error('mock: falló la red') */ }
export function vacio<T>(v: T[]): T[] { /* en modo 'vacio' devuelve [] */ }
```

**Regla:** toda función de `api.*.ts` hace, en este orden: `await delay()` → `quizasFallar()` →
devolver dato (pasado por `vacio()` si es lista). Sin excepción. Es lo que hace que los cuatro
estados de cada pantalla sean probables con dos clics.

### Fixtures obligatorios (`lib/mock/data.ts`)

- **25 departamentos** de Corrientes (dato real, nombres reales).
- **10 intereses** del catálogo cerrado, con nombre e ícono: salud, educación, seguridad, trabajo,
  obras públicas, campo y producción, ambiente, transporte, cultura, niñez y familia.
- **20 propuestas ficticias realistas**, tituladas y redactadas como proyectos de ley correntinos,
  cubriendo obligatoriamente estos casos límite:
  - 1 con `resumenIa: null` y `estado: 'procesando'` (la IA no corrió)
  - 1 con título de **140 caracteres** (el caso que rompe el layout)
  - 1 con título de **18 caracteres** (el caso que deja hueco)
  - 3 con `tieneRespuesta: true`
  - 1 con `totalSapucais: 0` (nadie opinó todavía)
  - 1 con `totalSapucais: 1847` (el número que rompe la tipografía)
  - 1 con termómetro casi empatado (34/33/33) y 1 aplastado (96/2/2)
  - 1 con `estado: 'cerrada'`
- **60 sapucais** repartidos, incluyendo: 6 `estadoProcesamiento: 'pendiente'`,
  3 `'error'`, 4 con `moderacionOk: null` (cola de moderación), 2 con `moderacionOk: false`,
  8 sin audio (escritos), 1 con una transcripción de 400 palabras, 1 de 4 palabras.
- **3 respuestas** de diputado, una de ellas larga (3 párrafos) y una de dos oraciones.
- **12 notificaciones**, 4 sin leer.
- **3 argumentos agrupados** por cada propuesta que tenga más de 20 sapucais.

**Nombres de personas:** nombres de pila correntinos + inicial. Nada de nombres completos que
parezcan personas reales. **Diputados:** nombres claramente inventados, y en la UI todo bloque de
datos de demostración lleva la marca `datos de demostración`.

---

## 5. Catálogo de skills: cuál, quién, cuándo

Compartimos las mismas skills. Esta tabla evita que las dos hagan lo mismo o que una use la
equivocada. **La columna `Cómo se invoca` es literal.**

| Skill | Para qué sirve acá | Quién | Cómo se invoca |
|---|---|---|---|
| **`impeccable`** | **La skill principal de todo el front.** Construir y revisar cualquier pantalla. Ya tiene la dirección visual decidida en DESIGN.md. | Las dos, en casi toda sesión | `Skill: impeccable` + argumento con el sub-comando (ver abajo) |
| **`agent-browser`** | **Todas las pruebas visuales en localhost.** Abrir, redimensionar, capturar, leer la consola. Se prefiere sobre cualquier otra herramienta de navegador. | Las dos, al cerrar cada sesión | `Skill: agent-browser` |
| **`motion-design`** | Timing, easing y coreografía del movimiento de tela: la cinta que se ata, el sello que cae, el waveform. | Lara (S5, S7) · Malen (S7) | `Skill: motion-design` |
| **`apple-design`** | Gestos y física: mantener presionado para grabar, hojas modales, scroll interrumpible, spring. | Lara (S5) | `Skill: apple-design` |
| **`emil-design-eng`** | Pulido fino de componentes y los detalles invisibles. Se usa **al final**, no al principio. | Las dos (S7) | `Skill: emil-design-eng` |
| **`dataviz`** | **Antes de escribir una sola línea de gráfico.** Termómetro/campo dividido, argumentos agrupados, mapa por departamento. | Malen (S3, S6) · Lara (S3, solo el termómetro chico) | `Skill: dataviz` |
| **`ui-ux-pro-max`** | Patrones de producto densos: tabla, formulario largo, cola de moderación. Y búsqueda de componentes de shadcn/ui. | Malen (S2, S4, S5) | `Skill: ui-ux-pro-max` |
| **`animation-vocabulary`** | Cuando no sabés cómo se llama un efecto y necesitás pedirlo bien. | Las dos, a demanda | `Skill: animation-vocabulary` |
| **`improve-animations`** | Auditoría de todo el movimiento del proyecto, al final. | Juntas (S8) | `Skill: improve-animations` |
| **`superpowers:brainstorming`** | **Obligatoria** antes de cualquier pantalla cuyo comportamiento no esté completamente definido en este plan. | Las dos, cuando aplique | `Skill: superpowers:brainstorming` |
| **`superpowers:verification-before-completion`** | Antes de decir "terminé" en cualquier sesión. Exige evidencia, no afirmaciones. | Las dos, al cerrar cada sesión | `Skill: superpowers:verification-before-completion` |
| **`superpowers:executing-plans`** | Cómo ejecutar este plan sesión por sesión con puntos de control. | Las dos, al abrir el proyecto | `Skill: superpowers:executing-plans` |

### Los sub-comandos de `impeccable` y cuándo usar cada uno

`impeccable` cambia de comportamiento según el argumento. Usá el correcto:

| Argumento | Cuándo | Ejemplo de invocación |
|---|---|---|
| *(descripción libre)* | Construir una pantalla nueva | `impeccable` → "construir el feed del ciudadano según DESIGN.md" |
| `shape <pantalla>` | Planear UX de una pantalla antes de codear | `impeccable` → `shape el grabador de audio` |
| `onboard <ruta>` | Estados vacíos, primera vez, activación | `impeccable` → `onboard app/(citizen)/onboarding` |
| `harden <ruta>` | Estados de error, casos límite, texto larguísimo | `impeccable` → `harden app/(citizen)/propuesta/[id]` |
| `clarify <ruta>` | Copy, etiquetas, mensajes de error (en criollo correntino) | `impeccable` → `clarify app/(citizen)/onboarding` |
| `adapt <ruta>` | Responsive, tamaños de pantalla | `impeccable` → `adapt app/(backoffice)/panel` |
| `animate <ruta>` | Agregar movimiento con propósito | `impeccable` → `animate components/citizen/Grabador.tsx` |
| `audit <ruta>` | a11y, performance, responsive — chequeo técnico | `impeccable` → `audit app/(citizen)` |
| `critique <ruta>` | **Revisión cruzada**: revisar el trabajo de la otra | `impeccable` → `critique app/(backoffice)/panel` |
| `polish <ruta>` | Pasada final antes de entregar | `impeccable` → `polish app/(citizen)/feed` |
| `live` | Iterar visualmente en el navegador sobre un elemento | `impeccable` → `live` |

### Skills que NO se usan en este proyecto (y por qué)

- **`taste-skill`** — es para landing pages, portfolios y rediseños de sitios de marketing. Sapucái
  es una app de tarea (modo *Operate*). Usar esta skill acá nos saca de DESIGN.md.
- **`gsd-*` (todas)** — es otro sistema de planificación completo, con sus propios artefactos.
  Nuestro plan es este archivo. Mezclarlos duplica la fuente de verdad.
- **`claude-mem:make-plan` / `claude-mem:do`** — misma razón.
- **`n8n-*`, `gsap-*`** — no usamos n8n, y la librería de animación es CSS + Framer Motion si hace
  falta. No se instala GSAP.
- **`context-mode:*`** — herramientas del modelo, no del proyecto. Se usan si conviene, no se planifican.
- **`artifact-design` / `Artifact`** — no publicamos artifacts. El entregable es la app en el repo.
- **`playwright-cli`** — se prefiere `agent-browser` para las pruebas visuales (una sola herramienta
  de navegador para las dos, así los screenshots son comparables).

---

## 6. Protocolo VP — la prueba visual que cierra cada sesión

**Se corre completo al final de cada sesión, sin excepción.** Es idéntico para las dos, y es lo que
hace que el trabajo de una sea revisable por la otra.

### VP-0 · Levantar el proyecto

```bash
pnpm dev -p 3000     # Lara
pnpm dev -p 3001     # Malen
```

Invocar `Skill: agent-browser` y con esa herramienta hacer todo lo que sigue.

### VP-1 · Los cuatro estados

Con el **DevSwitcher** (abajo a la derecha), forzar y capturar cada uno:

| Modo | Qué tiene que pasar |
|---|---|
| `ok` | La pantalla con datos, completa |
| `cargando` (modo `lento`) | Un esqueleto o un estado de carga **diseñado**, no un spinner genérico ni un salto de layout |
| `vacio` | Un estado vacío con texto en criollo que dice qué hacer, no "No hay datos" |
| `error` | Un mensaje que explica qué pasó y ofrece reintentar. **Nunca una pantalla en blanco ni un stack trace** |

### VP-2 · Los cinco tamaños

| Ancho × alto | Quién | Qué se verifica |
|---|---|---|
| 360 × 640 | Lara (obligatorio) · Malen (si su pantalla es responsive) | Android chico: nada se desborda, nada se corta |
| 375 × 667 | Lara | iPhone SE |
| 412 × 915 | **Lara (crítico)** | El celular de la demo. Acá tiene que verse perfecto |
| 1440 × 900 | Las dos | Ciudadano: columna de 420px centrada sobre campo índigo. Backoffice: grilla completa |
| 1920 × 1080 | **Malen (crítico)** | El proyector del pitch |

Capturar cada tamaño. **Ningún scroll horizontal en ningún tamaño. Nunca.**

### VP-3 · Los casos de contenido que rompen

Usando los fixtures preparados a propósito en §4:
- La propuesta de **título de 140 caracteres** → no desborda, no empuja nada, corta con elegancia.
- La de **título de 18 caracteres** → no deja un hueco raro.
- El sapucai de **400 palabras** → el panel de lienzo crece, no scrollea internamente.
- El contador de **1847** → los números tabulares no rompen la línea.
- El termómetro **34/33/33** y el **96/2/2** → las tres partes siguen siendo visibles y legibles.
- La propuesta con `resumenIa: null` → muestra "pendiente de análisis", **no** un hueco vacío.

### VP-4 · Teclado y foco

Recorrer la pantalla entera con `Tab`. Verificar:
- El orden de foco sigue el orden visual.
- El aro de foco es **visible sobre campo índigo y sobre lienzo** (es Oro Filete, ver DESIGN.md).
- `Enter` y `Espacio` activan lo que tiene el foco.
- `Escape` cierra cualquier hoja o modal.
- Ninguna trampa de foco.

### VP-5 · Contraste y sol

- Todo texto llega a **WCAG AA**; el cuerpo de texto sobre lienzo, a AAA donde se pueda.
- Ningún párrafo sobre campo índigo (Regla del Lienzo).
- Ningún objetivo táctil menor a 44px.
- Cuerpo de texto del ciudadano nunca menor a 16px (Regla de los 16).

### VP-6 · Movimiento reducido

Activar `prefers-reduced-motion: reduce` en el navegador. Ninguna animación de desplazamiento,
despliegue ni caída de sello. Solo fundidos. Nada se rompe ni queda invisible.

### VP-7 · Consola limpia

Cero errores y cero warnings de React en la consola. Cero `Warning: Each child in a list...`.
Cero hydration mismatch.

### VP-8 · El detector mecánico de `impeccable`

```bash
node "C:\Users\spruy\.claude\skills\impeccable\scripts\detect.mjs" --json <archivos-que-toqué>
```

Se corre **una sola vez, al final**, nunca durante la construcción. Cada hallazgo se arregla o se
justifica por escrito en la fila de §11.

### VP-9 · Screenshots y revisión cruzada

Guardar todas las capturas en:

```
docs/visual/<carril>/S<N>-<pantalla>/
  ok-412x915.png   vacio-412x915.png   cargando-412x915.png   error-412x915.png
  ok-1440x900.png  ok-1920x1080.png    titulo-largo-412x915.png ...
```

Commitear las capturas. Después, **la otra persona** abre la carpeta y ejecuta:

`Skill: impeccable` → `critique docs/visual/<carril>/S<N>-<pantalla>`

y escribe sus hallazgos en §12. **Regla:** ninguna pantalla se considera terminada hasta que la otra
la criticó. La crítica es una obligación mutua, no una gentileza — y es la única forma de que dos
carriles separados terminen pareciendo un solo producto.

---

## 7. Mapa de sesiones

Cada sesión es una unidad de trabajo cerrada: una rama, un merge, una fila en §11.
**Las sesiones con el mismo número corren en paralelo, una por persona.**

| # | Lara — CIUDADANO | Malen — BACKOFFICE |
|---|---|---|
| **0** | **S0 · Andamiaje** (única, la hace Lara sola) | *(espera; lee los 3 docs y prepara su entorno)* |
| **1** | **S1L · Tokens y guía visual `/diseno`** | **S1M · Contrato de mock data + DevSwitcher** |
| **2** | **S2L · Onboarding** | **S2M · Shell del backoffice + carga de propuesta** |
| **3** | **S3L · Feed** | **S3M · Panel del diputado: termómetro y argumentos** |
| **4** | **S4L · Detalle de propuesta + respuesta del diputado** | **S4M · Lista de sapucais + editor de respuesta** |
| **5** | **S5L · Grabador de sapucai** | **S5M · Cola de moderación** |
| **6** | **S6L · Notificaciones y campanita** | **S6M · Mapa de Corrientes por departamento** 🟡 |
| **7** | **S7L · Pulido y movimiento del ciudadano** | **S7M · Pulido y movimiento del backoffice** |
| **8** | **S8 · Integración, recorrido del pitch y cierre** (juntas) | ← misma sesión |

**Orden de prioridad si se corta el tiempo:** S0 → S1 → S2 → S3 → S4 → **S8** → S5 → S6 → S7.
S4 en los dos carriles es el cierre del ciclo (respuesta del diputado → aviso al ciudadano), que es
lo último que se sacrifica según PROJECT.md §3.

---

## 8. Sesiones compartidas

### S0 · Andamiaje

**DUEÑA:** Lara · **RAMA:** `feat/base/andamiaje` · **SKILL:** ninguna de diseño todavía —
solo `superpowers:verification-before-completion` al cerrar.
**Malen no ejecuta nada en paralelo:** lee PROJECT.md, PRODUCT.md, DESIGN.md y este plan, e instala
Node 20+ y pnpm.

**CREA:**

```
package.json · tsconfig.json · next.config.ts · postcss.config.mjs · components.json
app/layout.tsx · app/globals.css · app/page.tsx
app/(citizen)/layout.tsx      ← vacío, solo el contenedor de 420px
app/(backoffice)/layout.tsx   ← vacío, solo la grilla
lib/fonts.ts
docs/visual/.gitkeep
.gitignore · .env.example
```

**PASOS:**

1. `pnpm dlx create-next-app@latest . --ts --app --tailwind --eslint --src-dir=false --import-alias="@/*"`
   (Next.js 15 App Router, Tailwind v4, TypeScript, sin `src/`).
2. `pnpm dlx shadcn@latest init` → estilo base, variables CSS **sí**, color base neutro
   (los colores reales los define S1L, no shadcn).
3. `lib/fonts.ts` con `next/font/google`: **Archivo** (variable, ejes `wght` y `wdth`) y
   **Libre Franklin** (variable). Exportar como variables CSS `--font-display` y `--font-body`.
   Cargar ambas en `app/layout.tsx` con `display: 'swap'`.
4. `app/layout.tsx`: `lang="es-AR"`, `<meta name="viewport">` con `viewport-fit=cover`,
   metadata con título y descripción de Sapucái, y el `<body>` en Índigo Nocturno.
5. Crear las carpetas vacías con `.gitkeep`: `components/ui`, `components/citizen`,
   `components/backoffice`, `components/dev`, `lib/mock`, `docs/visual/ciudadano`,
   `docs/visual/backoffice`.
6. `.env.example` con una sola línea: `NEXT_PUBLIC_MOCK=1`. Nada más. **No agregar variables de
   Supabase ni de AWS en este plan.**
7. `app/page.tsx`: una redirección a `/feed`.

**DoD:** `pnpm dev` levanta sin errores ni warnings · `pnpm build` pasa · las dos fuentes cargan
(verificable en la pestaña Network) · consola limpia · mergeado a `front` y pusheado.
**Sin Protocolo VP** (todavía no hay nada visual que probar).

---

### S1L · Tokens y guía visual `/diseno`

**DUEÑA:** Lara · **RAMA:** `feat/base/tokens-y-diseno`
**SKILL:** `impeccable` → *"construir la guía visual de los primitivos según DESIGN.md"*.
Después, `dataviz` **antes** de dibujar el campo dividido.

Esta sesión produce **el contrato visual que las dos consumen el resto del proyecto**. Es la sesión
de mayor apalancamiento del plan: si los primitivos están bien, las 8 pantallas salen solas.

**CREA:**

```
app/globals.css                     ← todos los tokens de DESIGN.md como custom properties
app/diseno/page.tsx                 ← la guía visual navegable
components/ui/Estandarte.tsx        ← la tarjeta-estandarte, con su banda de izada
components/ui/BandaIzada.tsx        ← la banda de 8px con los dos ojales
components/ui/PanelLienzo.tsx       ← el panel de lectura con su borde cosido de 3px
components/ui/Insignia.tsx          ← la insignia de tema (círculo 40px, ícono + etiqueta)
components/ui/Sello.tsx             ← el sello del diputado (48px / 72px)
components/ui/CampoDividido.tsx     ← el termómetro heráldico
components/ui/Cinta.tsx             ← la cinta de un sapucai
components/ui/Boton.tsx             ← primario, secundario, fantasma; radio 2px
components/ui/Campo.tsx             ← input y textarea sobre lienzo
components/ui/EtiquetaPostura.tsx   ← a favor / en contra / neutro / pendiente
components/ui/Estado.tsx            ← los 3 estados reutilizables: Vacio, Cargando, Error
components/ui/Skeleton.tsx          ← esqueleto de carga en la forma del estandarte
```

**PASOS:**

1. Escribir en `app/globals.css`, dentro de `@theme` (Tailwind v4), **todos** los tokens de
   DESIGN.md con sus valores exactos: los 6 colores de campo y neutros, el oro, las 3 tintas de
   postura, la escala de espaciado `4 8 12 16 24 32 48 64`, el radio de 2px, los 5 breakpoints,
   y los tokens de movimiento (`--ease-tela: cubic-bezier(.2,.8,.2,1)`, `--dur-atar: 320ms`,
   `--dur-sello: 420ms`).
2. Definir los 6 roles tipográficos de DESIGN.md como clases utilitarias:
   `.t-display .t-headline .t-title .t-body .t-label .t-data`. Nadie escribe tamaños a mano después.
3. Construir los 13 primitivos. Reglas duras de DESIGN.md que hay que respetar en cada uno:
   **cero `box-shadow`** · **radio 2px** · **el oro solo como línea de 1px, anillo del sello y aro de
   foco** · **las tintas de postura solo en datos** · **ningún párrafo sobre índigo**.
4. **Antes** de `CampoDividido.tsx`, invocar `Skill: dataviz`. Es un gráfico y la skill define cómo
   se hace: una barra continua de 12px dividida en tres, separada por 1px de Hilo, con los
   porcentajes en `.t-data` debajo, **sin leyenda flotante, sin dona, sin gradiente**.
5. `app/diseno/page.tsx`: renderizar **todos** los primitivos, **en todos sus estados**, con una
   etiqueta encima de cada uno diciendo su nombre de archivo. Incluir a propósito:
   el título de 140 caracteres, el de 18, el contador de 1847, el termómetro 34/33/33 y el 96/2/2.
6. Escribir arriba de `app/diseno/page.tsx` un comentario con el **contrato de dirección** de 5
   bloques (`THESIS / OWN-WORLD / STORY / FIRST VIEWPORT / FORM`), copiando la dirección de
   DESIGN.md y anotando `FORM: El Estandarte — candidata 7 de 7, seed 852e285a`.

**DoD:** Protocolo VP completo sobre `/diseno` · cada primitivo se ve en sus 4 estados ·
`node detect.mjs` sin hallazgos abiertos · **Malen ejecuta `impeccable critique app/diseno` y
aprueba antes de que Lara siga a S2L.** Esta aprobación es un punto de control bloqueante: es la
única vez en el plan que una carril espera a la otra, y vale la pena.

---

### S1M · Contrato de mock data + DevSwitcher

**DUEÑA:** Malen · **RAMA:** `feat/base/mock-data`
**SKILL:** ninguna de diseño (esto no es UI, es datos), salvo `impeccable` para el DevSwitcher.
Corre **en paralelo** a S1L: no comparten ni un archivo.

**CREA:**

```
lib/types.ts                      ← los tipos de §4, tal cual están escritos ahí
lib/mock/delay.ts
lib/mock/state.ts
lib/mock/data.ts                  ← todos los fixtures de §4
components/dev/DevSwitcher.tsx
```

**PASOS:**

1. Copiar los tipos de §4 **exactamente**. Si algo falta, agregarlo y anotarlo en §12 — no cambiar
   lo que ya está.
2. `state.ts` y `delay.ts` según §4. `localStorage` como fuente, con un valor por defecto de `'ok'`
   y lectura segura en el servidor (`typeof window === 'undefined'` → `'ok'`).
3. `data.ts` con **todos** los fixtures de §4, incluidos los casos límite. Este es el trabajo real de
   la sesión: 20 propuestas con texto creíble de proyecto de ley correntino, y 60 sapucais con
   transcripciones que suenen a gente hablando, no a texto generado. **La calidad de estos datos
   determina si las pantallas se ven bien o se ven a demo.** Los nombres son de pila + inicial.
4. `DevSwitcher.tsx`: botón flotante abajo a la derecha, visible **solo** si
   `process.env.NEXT_PUBLIC_MOCK === '1'`. Al abrirlo, dos selectores:
   - **Rol:** ciudadano / equipo de cámara / diputado
   - **Modo:** ok / vacío / lento / error

   Al cambiar cualquiera, escribe en `localStorage` y hace `router.refresh()`.
   Visualmente: no compite con nada; usa Índigo Nocturno, 32px de alto, esquina inferior derecha,
   y **por encima de la barra fija de acción del ciudadano** sin taparla.
5. Montar el DevSwitcher en `app/layout.tsx`. **Es la única edición de Malen sobre un archivo de
   Lara en todo el plan** — se hace en esta sesión, se anota en §12, y no se vuelve a tocar.

**DoD:** `pnpm build` pasa · los tipos compilan sin `any` · el DevSwitcher cambia el modo y se ve el
efecto en `/diseno` · Lara verifica que el DevSwitcher no tapa nada · mergeado a `front`.

---

## 9. Carril de Lara — CIUDADANO

Escena real, que manda sobre toda decisión: **una mano, un pulgar, un Android de gama media, al sol,
40 segundos de paciencia.**

### S2L · Onboarding

**RAMA:** `feat/ciudadano/onboarding`
**SKILLS, en este orden:** `impeccable` → `shape el onboarding del ciudadano` · después
`impeccable` → `onboard app/(citizen)/onboarding` · al final `impeccable` → `clarify` para el copy.

**CREA:** `app/(citizen)/onboarding/page.tsx` (3 pasos) · `components/citizen/PasoBienvenida.tsx` ·
`components/citizen/PasoIdentidad.tsx` · `components/citizen/PasoIntereses.tsx` ·
`components/citizen/Progreso.tsx` · `lib/mock/api.citizen.ts` (`getIntereses`, `getDepartamentos`,
`guardarPerfil`)

**QUÉ TIENE QUE PASAR:**
- 3 pasos: bienvenida → DNI + departamento → grilla de intereses. **Se completa en menos de 40
  segundos**, y eso se mide con cronómetro en la prueba visual.
- El paso de intereses es una grilla de **insignias grandes** (mínimo 88px de alto), seleccionables
  con el pulgar, con estado seleccionado evidente **sin usar color de categoría** (Regla de la
  Insignia): la insignia seleccionada invierte a Lienzo con filete dorado.
- Departamento: un selector con los 25 departamentos reales, buscable escribiendo.
- DNI: teclado numérico (`inputMode="numeric"`), validación suave, mensaje de error en criollo.
- El copy es correntino y directo. "Contanos de qué te querés enterar", no "Seleccione sus
  preferencias de notificación".
- Se puede avanzar sin elegir intereses, pero se avisa qué se pierde. Nunca un botón trabado sin
  explicación.

**PRUEBAS VISUALES ESPECÍFICAS (además del Protocolo VP):**
- Cronometrar el recorrido completo en 412×915. **Si pasa de 40 segundos, la sesión no está
  terminada.** Anotar el tiempo real en §11.
- Con 0 intereses elegidos, con 1, y con los 10.
- Con el teclado del celular abierto: el botón de siguiente no queda tapado.
- Nombre de departamento más largo de Corrientes: no desborda el selector.

---

### S3L · Feed

**RAMA:** `feat/ciudadano/feed`
**SKILLS:** `impeccable` → *"construir el feed del ciudadano según DESIGN.md"* ·
`dataviz` antes de usar `CampoDividido` en tamaño chico · `impeccable` → `harden` al final.

**CREA:** `app/(citizen)/feed/page.tsx` · `components/citizen/EstandarteFeed.tsx` ·
`components/citizen/FiltroIntereses.tsx` · `components/citizen/CabeceraCiudadano.tsx` ·
en `api.citizen.ts`: `getFeed(interesesDelUsuario)`

**QUÉ TIENE QUE PASAR:**
- **Primer viewport:** campo índigo a sangrado completo, el estandarte más nuevo arriba a escala
  grande con su insignia y su campo dividido en vivo, y abajo la columna de estandartes más chicos.
- Cada estandarte muestra: banda de izada, insignia(s) de tema, título en Headline, dos líneas de
  resumen en un panel de lienzo, y el estado — `124 sapucais` y, si corresponde, **el sello** con
  `el diputado respondió`.
- El feed está **filtrado por los intereses del usuario** y eso se dice explícitamente en pantalla,
  con un acceso a cambiarlos.
- La propuesta con `resumenIa: null` muestra `pendiente de análisis` en Gris Pizarra, no un hueco.
- La propuesta `cerrada` se ve distinta y no invita a grabar.
- Estado vacío: "Todavía no hay nada de los temas que elegiste" + botón para agregar temas.

**PRUEBAS VISUALES ESPECÍFICAS:** el título de 140 caracteres en 360×640 · una propuesta con 3
insignias · `totalSapucais: 0` y `1847` · el feed con 1 sola propuesta y con las 20 · en 1440×900
la columna centrada de 420px sobre campo índigo, sin que el campo se vea "vacío a los costados".

---

### S4L · Detalle de propuesta + respuesta del diputado

**RAMA:** `feat/ciudadano/detalle`
**SKILLS:** `impeccable` → *"construir el detalle de propuesta"* · `motion-design` **antes** de
animar la caída del sello · `impeccable` → `harden` al final.

**Esta es, junto a S4M y S6L, la sesión que cierra el ciclo. Es lo último que se sacrifica.**

**CREA:** `app/(citizen)/propuesta/[id]/page.tsx` · `components/citizen/DetallePropuesta.tsx` ·
`components/citizen/RespuestaDiputado.tsx` · `components/citizen/BarraGrabar.tsx` (solo el
disparador; el grabador es S5L) · `components/citizen/TextoOriginalPlegable.tsx` ·
en `api.citizen.ts`: `getPropuesta(id)`, `getRespuesta(propuestaId)`

**QUÉ TIENE QUE PASAR:**
- Arriba: el título en Display (el único grito de la pantalla) sobre campo, con sus insignias.
- **El resumen en criollo es lo primero que se lee**, en un panel de lienzo grande y cómodo.
  El texto original de la ley va plegado abajo, disponible pero no en el camino.
- **La respuesta del diputado, si existe, es lo más destacado de la pantalla después del resumen**:
  panel de lienzo con el **sello de 72px**, el nombre y el bloque del diputado, y su texto.
  El sello **cae** al entrar en viewport (`--dur-sello`, `--ease-tela`), una sola vez, y no cae si
  `prefers-reduced-motion`.
- Abajo, **fija**, la barra de grabar: 72px, `env(safe-area-inset-bottom)`, el único elemento a la
  altura del pulgar. Si el usuario ya mandó su sapucai, la barra cambia a "ya mandaste el tuyo" y
  ofrece escucharlo.
- El campo dividido con el termómetro, y debajo `de N sapucais` — con la marca de
  `datos de demostración`.
- Si la propuesta está `cerrada`: la barra de grabar no aparece y se explica por qué.

**PRUEBAS VISUALES ESPECÍFICAS:** con respuesta y sin respuesta · respuesta de 3 párrafos y de 2
oraciones · el resumen en `null` · con el texto original plegado y desplegado · **la barra fija no
tapa el último bloque de contenido al scrollear hasta abajo** (el error clásico: dejar
`padding-bottom` de 72px + safe area en el contenedor) · el sello con `prefers-reduced-motion`.

---

### S5L · Grabador de sapucai

**RAMA:** `feat/ciudadano/grabador`
**SKILLS, en este orden:** `apple-design` (gestos, presión sostenida, hojas, spring, física
interrumpible) → `impeccable` → `shape el grabador de audio` → construir →
`motion-design` para el waveform y el atado de la cinta → `impeccable` → `harden`.

Es el componente más difícil del carril y el momento más visto de la demo. Se le da su sesión completa.

**CREA:** `components/citizen/Grabador.tsx` · `components/citizen/Waveform.tsx` ·
`components/citizen/HojaGrabar.tsx` · `components/citizen/AlternativaTexto.tsx` ·
en `api.citizen.ts`: `enviarSapucai({ propuestaId, blob | texto })`

**QUÉ TIENE QUE PASAR:**
- Se abre como **hoja** desde la barra fija. Se cierra con `Escape`, con gesto hacia abajo, y con
  un botón visible.
- **Mantener presionado para grabar.** Se suelta y se detiene. Con un tope de duración visible
  (sugerido: 60 segundos) y el contador corriendo.
- El **waveform** se dibuja mientras se habla, como **puntadas de costura** (la gramática del
  estandarte), no como barras de ecualizador genéricas. Usa `MediaRecorder` +
  `AudioContext.createAnalyser`. **Sin librería de audio nueva.**
- Tres estados después de grabar: **escuchar**, **regrabar**, **enviar**. Nada más.
- Al enviar: la cinta se **ata** al estandarte (`--dur-atar`, `--ease-tela`, origen arriba),
  y aparece "quedó pendiente de análisis" — porque en el producto real la IA todavía no corrió.
  Ese estado honesto es parte del diseño, no un placeholder.
- **La alternativa de texto siempre existe y se ve** (PRODUCT.md, accesibilidad). No escondida en
  un menú: un enlace claro que dice "prefiero escribirlo".
- **Permiso de micrófono denegado:** estado diseñado que explica cómo habilitarlo y ofrece escribir.
  Este es el caso que más se olvida y el que más probable es que pase en la demo.

**PRUEBAS VISUALES ESPECÍFICAS:** permiso concedido / denegado / no soportado por el navegador ·
grabación de 1 segundo y de 60 · durante la grabación en 360×640 · con `prefers-reduced-motion` ·
la alternativa de texto con 400 caracteres · **probar en un Android real si hay uno a mano** —
`MediaRecorder` se comporta distinto ahí y esto se descubre ahora, no en el pitch.

---

### S6L · Notificaciones y campanita

**RAMA:** `feat/ciudadano/notificaciones`
**SKILLS:** `impeccable` → *"construir la campanita y la lista de notificaciones"* ·
`motion-design` para la llegada del badge.

**Cierra el ciclo del lado del ciudadano. Prioridad alta.**

**CREA:** `app/(citizen)/notificaciones/page.tsx` · `components/citizen/Campanita.tsx` ·
`components/citizen/ListaNotificaciones.tsx` · en `api.citizen.ts`: `getNotificaciones`,
`marcarLeida`, `contarNoLeidas`

**QUÉ TIENE QUE PASAR:**
- La campanita vive en `CabeceraCiudadano`, con badge de no leídas en Cochinilla **como texto sobre
  disco de Lienzo**, no como fondo rojo de una superficie (Regla de la Postura).
- Las notificaciones de tipo `respuesta_diputado` llevan **el sello** y son visualmente más
  importantes que las de `nueva_propuesta`. Ese contraste es el cierre del ciclo hecho visible.
- Tocar una notificación lleva al detalle de la propuesta, a la respuesta.
- Estado vacío con copy en criollo. Agrupadas por día.
- **Para el pitch:** el badge tiene que poder **aparecer en vivo**. Dejar en `api.citizen.ts` una
  función `simularRespuestaDelDiputado()` que agrega una notificación no leída, y un disparador en
  el DevSwitcher. Ese es el momento del paso 5 del guion del pitch (PROJECT.md §14) y hay que poder
  ensayarlo sin backend.

**PRUEBAS VISUALES ESPECÍFICAS:** 0, 1, 4 y 12 notificaciones · badge con 1 y con 99+ · disparar
`simularRespuestaDelDiputado()` con el feed abierto y ver aparecer el badge · con
`prefers-reduced-motion`.

---

### S7L · Pulido y movimiento del ciudadano

**RAMA:** `feat/ciudadano/pulido`
**SKILLS, en este orden:** `emil-design-eng` (los detalles invisibles) → `impeccable` →
`animate app/(citizen)` → `impeccable` → `polish app/(citizen)` → `impeccable` →
`audit app/(citizen)`.

**QUÉ TIENE QUE PASAR:**
- Una sola gramática de movimiento en todo el carril, con los tokens de S1L. Nada de easings
  sueltos por componente.
- Transiciones entre pantallas: feed → detalle tiene que sentirse como abrir el estandarte, no como
  cargar una página nueva.
- Los estados de carga son esqueletos **con la forma del estandarte**, y no producen salto de layout.
- Todos los `:focus-visible`, `:active` y `:disabled` revisados uno por uno.
- Ningún `box-shadow` sobrevive (Regla Sin Sombra). Verificarlo con el detector.
- `pnpm build` sin warnings. Lighthouse mobile: performance y accesibilidad ≥ 90.

**DoD:** Protocolo VP completo sobre **las 5 pantallas del ciudadano**, no solo la última.

---

## 10. Carril de Malen — BACKOFFICE

Escena real, que manda sobre toda decisión: **monitor grande, oficina, sesión de trabajo — y una vez,
proyectado ante un jurado.** El panel del diputado es la única pantalla del proyecto que se diseña
para pantalla grande primero.

### S2M · Shell del backoffice + carga de propuesta

**RAMA:** `feat/backoffice/carga`
**SKILLS, en este orden:** `ui-ux-pro-max` (patrones de formulario largo y de layout de panel
administrativo; y búsqueda de componentes de shadcn/ui) → `impeccable` →
*"construir el shell del backoffice y la carga de propuesta según DESIGN.md"* → `impeccable` →
`clarify` para el copy.

**CREA:** `app/(backoffice)/layout.tsx` (la grilla, la navegación lateral) ·
`app/(backoffice)/cargar/page.tsx` · `components/backoffice/NavLateral.tsx` ·
`components/backoffice/FormularioPropuesta.tsx` · `components/backoffice/SugerenciaIA.tsx` ·
`lib/mock/api.backoffice.ts` (`crearPropuesta`, `pedirSugerenciaIA`, `publicarPropuesta`)

**QUÉ TIENE QUE PASAR:**
- El shell del backoffice usa **Índigo Nocturno** como fondo, con la navegación lateral fija y el
  contenido en paneles de Lienzo. Es el mismo mundo visual que el ciudadano, en densidad de trabajo.
- La carga: se pega el texto del proyecto de ley en un textarea grande y cómodo.
- Se aprieta "analizar" → estado de procesando (usar el modo `lento` para probarlo) → la IA
  **propone** resumen y de 1 a 3 categorías del catálogo cerrado.
- **La IA sugiere, la persona aprueba** (PRODUCT.md, principio 3). Eso tiene que ser evidente en el
  diseño, no una nota al pie: la sugerencia llega en un bloque marcado como
  `sugerido por IA`, **editable**, con "aceptar" y "descartar" visibles. Publicar sin revisar tiene
  que ser más difícil que revisar.
- Las categorías sugeridas se eligen **del catálogo cerrado** de `data.ts`. La UI **no permite
  escribir una categoría nueva**. Es la regla 4 de CLAUDE.md hecha interfaz.
- Si la IA falla (modo `error`): la propuesta se guarda igual como `procesando`, sin resumen, y se
  puede publicar así o reintentar. **Nunca se pierde el texto que la persona pegó.** Ese es el caso
  que hay que probar con más cuidado de toda la sesión.

**PRUEBAS VISUALES ESPECÍFICAS:** texto de ley de 8000 caracteres pegado de golpe · el modo `lento`
durante el análisis (que no parezca colgado) · el modo `error` (que no se pierda el texto) ·
0, 1 y 3 categorías sugeridas · en 1440×900 y en 1920×1080 · con la navegación lateral colapsada.

---

### S3M · Panel del diputado: termómetro y argumentos

**RAMA:** `feat/backoffice/panel`
**SKILLS, en este orden:** **`dataviz` primero, antes de escribir una línea de gráfico** →
`impeccable` → *"construir el panel del diputado"* → `impeccable` → `adapt` al final.

**Esta es la pantalla que se proyecta. Es la que tiene que dar el "esto el diputado hoy no lo tiene".**

**CREA:** `app/(backoffice)/panel/[propuestaId]/page.tsx` ·
`components/backoffice/Termometro.tsx` · `components/backoffice/ArgumentosAgrupados.tsx` ·
`components/backoffice/ResumenPropuesta.tsx` · `components/backoffice/MetricasCabecera.tsx` ·
en `api.backoffice.ts`: `getPanel(propuestaId)`, `getArgumentos(propuestaId)`

**QUÉ TIENE QUE PASAR:**
- El **termómetro** es el `CampoDividido` de S1L, en tamaño grande: una división heráldica del campo,
  no un gráfico pegado encima. Porcentajes en `.t-data`, absolutos al lado, sin dona y sin gradiente.
  Legible desde el fondo de una sala.
- Los **argumentos agrupados**: de 3 a 5 bloques, cada uno con su texto, su postura y
  `lo dijeron N personas`. Ordenados por cantidad. Cada uno es un panel de Lienzo con su borde
  cosido, y el borde toma la tinta de su postura. **Ese es el único lugar donde una tinta de postura
  toca un borde de superficie, y está permitido porque es un dato, no una decoración.**
- Métricas de cabecera: total de sapucais, % de participación de departamentos, cuántos pendientes
  de análisis. Con la marca de `datos de demostración`.
- **Estado vacío que importa:** una propuesta con 0 sapucais. Y una con sapucais pero **sin
  argumentos agrupados todavía** (porque el prompt #4 corre on-demand): botón "agrupar argumentos"
  → modo `lento` → resultado. Ese flujo hay que diseñarlo, no dejarlo implícito.
- Todo dato numérico usa `tabular-nums`. Nada de números que bailan.

**PRUEBAS VISUALES ESPECÍFICAS:** termómetro 34/33/33, 96/2/2, y 0/0/0 · 3 y 5 argumentos, y cero ·
un argumento de 200 caracteres · en 1920×1080 **medido a distancia**: alejarse 2 metros de la
pantalla y verificar que el termómetro y los porcentajes se leen igual (es la prueba del proyector,
y es la que decide si esta pantalla funciona en el pitch) · en 1440×900 · en 1024×768.

---

### S4M · Lista de sapucais + editor de respuesta

**RAMA:** `feat/backoffice/respuesta`
**SKILLS:** `ui-ux-pro-max` (patrón de lista densa con reproductor) → `impeccable` →
*"construir la lista de sapucais y el editor de respuesta pública"* → `impeccable` → `harden`.

**Junto a S4L y S6L, esta sesión cierra el ciclo. Es lo último que se sacrifica.**

**CREA:** `components/backoffice/ListaSapucais.tsx` · `components/backoffice/FilaSapucai.tsx` ·
`components/backoffice/Reproductor.tsx` · `components/backoffice/EditorRespuesta.tsx` ·
en `api.backoffice.ts`: `getSapucais(propuestaId, filtros)`, `publicarRespuesta`

**QUÉ TIENE QUE PASAR:**
- Cada sapucai es una **cinta**: autor (nombre de pila + departamento), postura, duración,
  reproductor, y **la transcripción siempre visible** (PRODUCT.md, accesibilidad: el audio nunca es
  el único portador).
- Filtros por postura y por departamento. Ordenar por fecha y por duración.
- Los `estadoProcesamiento: 'pendiente'` se muestran con Gris Pizarra y sin postura — no se ocultan.
  Los `'error'` ofrecen reintentar.
- **El reproductor es de una sola pista global:** al darle play a uno, cualquier otro se detiene.
  Es el error clásico de esta pantalla y hay que resolverlo desde el diseño, con un solo estado.
- **El editor de la respuesta pública** es el momento más importante del backoffice:
  - Textarea cómoda con contador de caracteres.
  - Muestra **a cuántas personas les va a llegar** antes de publicar. Ese número es lo que hace que
    la persona entienda el peso de lo que está por hacer.
  - Confirmación explícita: publicar una respuesta pública es una acción difícil de revertir.
  - Estado publicado: se ve la respuesta con **el sello**, con la fecha, y ya no se edita.
  - Al publicar, si el DevSwitcher está en el rol ciudadano en otra pestaña, el badge de la
    campanita tiene que poder aparecer (coordinar con `simularRespuestaDelDiputado()` de S6L —
    **anotarlo en §12 y acordarlo con Lara**).

**PRUEBAS VISUALES ESPECÍFICAS:** 0, 1, 60 sapucais · la transcripción de 400 palabras y la de 4 ·
sapucai sin audio · dos reproductores (verificar que uno detiene al otro) · respuesta vacía, de 20
caracteres y de 2000 · el estado ya-publicado · en 1920×1080 y 1440×900.

---

### S5M · Cola de moderación

**RAMA:** `feat/backoffice/moderacion`
**SKILLS:** `ui-ux-pro-max` (patrón de cola de revisión con acciones rápidas) → `impeccable` →
*"construir la cola de moderación"* → `impeccable` → `harden`.

**CREA:** `app/(backoffice)/moderacion/page.tsx` · `components/backoffice/ColaModeracion.tsx` ·
`components/backoffice/TarjetaModeracion.tsx` · en `api.backoffice.ts`: `getColaModeracion`,
`resolverModeracion(id, decision, motivo)`

**QUÉ TIENE QUE PASAR:**
- Solo los sapucais con `moderacionOk: null` — lo que la IA marcó dudoso. Con el motivo que dio la
  IA, visible y marcado como `sugerido por IA`.
- Dos acciones grandes: **aprobar** y **ocultar**. Ocultar pide motivo.
- **Nadie edita el sapucai de nadie** (PROJECT.md §4). La UI no ofrece editar la transcripción.
  Solo aprobar u ocultar. Y queda registrado quién lo hizo: mostrar `ocultado por <persona>`.
- Se puede escuchar el audio antes de decidir.
- Estado vacío: "no hay nada para revisar" — que es el estado bueno, y el copy tiene que sonar a eso.
- Deshacer la última acción durante unos segundos. Moderar es irreversible y la gente se equivoca.

**PRUEBAS VISUALES ESPECÍFICAS:** cola con 4, con 1 y con 0 · ocultar sin motivo (no debe permitirlo)
· deshacer · un sapucai dudoso sin audio · en 1440×900.

---

### S6M · Mapa de Corrientes por departamento 🟡

**RAMA:** `feat/backoffice/mapa`
**SKILLS:** **`dataviz` primero** (es un mapa coroplético: la skill define escala secuencial,
leyenda y accesibilidad) → `impeccable` → *"integrar el mapa al panel"*.

**Esto es de la lista 🟡 de PROJECT.md, mejora #4. No se hace antes de que S2M–S5M estén cerradas.**

**CREA:** `components/backoffice/MapaDepartamentos.tsx` · `public/corrientes.svg` (o el GeoJSON
simplificado) · en `api.backoffice.ts`: `getPorDepartamento(propuestaId)`

**QUÉ TIENE QUE PASAR:**
- SVG inline con los 25 departamentos. **Sin librería de mapas** — nada de Leaflet ni Mapbox: pesan
  de más y no hacen falta para 25 polígonos estáticos.
- Escala secuencial **de una sola tinta de postura por vez**, con un selector de qué postura mirar.
  Un mapa con tres colores simultáneos no se lee (la skill `dataviz` lo explica).
- Hover y foco de teclado muestran nombre del departamento y sus números.
- **Alternativa accesible obligatoria:** una tabla ordenable con los mismos datos, siempre presente,
  no escondida. Un mapa nunca es el único portador de la información.
- Departamento sin datos: patrón neutro, distinguible del cero.

**PRUEBAS VISUALES ESPECÍFICAS:** todos los departamentos con datos, ninguno, y uno solo · las tres
posturas · recorrido completo con `Tab` · en 1920×1080 y 1440×900 · la tabla alternativa sola.

---

### S7M · Pulido y movimiento del backoffice

**RAMA:** `feat/backoffice/pulido`
**SKILLS:** `emil-design-eng` → `impeccable` → `animate app/(backoffice)` → `impeccable` →
`polish app/(backoffice)` → `impeccable` → `audit app/(backoffice)`.

**QUÉ TIENE QUE PASAR:** una sola gramática de movimiento, con los tokens de S1L · el sello es el
único objeto con movimiento de llegada · densidad y ritmo de espaciado revisados panel por panel ·
todos los estados de foco y `:disabled` · ningún `box-shadow` sobreviviente ·
`pnpm build` sin warnings.

**DoD:** Protocolo VP completo sobre **las 5 pantallas del backoffice**.

---

## 11. S8 · Integración, recorrido del pitch y cierre (juntas)

**RAMA:** `feat/base/integracion` · **Las dos, en la misma sesión, en la misma máquina si se puede.**

**SKILLS, en este orden:**
1. `impeccable` → `critique app/(citizen)` — **la ejecuta Malen** sobre el carril de Lara.
2. `impeccable` → `critique app/(backoffice)` — **la ejecuta Lara** sobre el carril de Malen.
   (Cada una critica el trabajo de la otra. Es la última oportunidad de que los dos carriles
   parezcan un solo producto.)
3. `improve-animations` sobre todo el proyecto — auditoría de movimiento, juntas.
4. `impeccable` → `audit .` — a11y, performance y responsive de punta a punta.
5. `superpowers:verification-before-completion` antes de declarar el front terminado.

**PASOS:**

1. **Promover los `.local`.** Todo componente duplicado que quedó anotado en §12 se unifica en
   `components/ui/` una sola vez, entre las dos. Después se borran los duplicados.
2. **Coherencia entre carriles.** Recorrer las 10 pantallas seguidas y anotar toda inconsistencia:
   espaciados que no coinciden, dos formas distintas del mismo estado vacío, dos copys distintos
   para el mismo error, dos maneras de mostrar una fecha. Arreglarlas.
3. **El recorrido del pitch, ensayado con cronómetro** — el guion de PROJECT.md §14, completo, con
   mock data:
   - Backoffice: pegar un proyecto de ley → analizar → revisar → publicar. *(30s)*
   - Ciudadano en 412×915: llega el aviso → abrir → leer el resumen → **grabar el sapucai**. *(45s)*
   - Panel en 1920×1080: el termómetro, los argumentos. *(30s)*
   - Backoffice: el diputado escribe y publica la respuesta.
   - Ciudadano: **aparece el badge de la campanita, se abre, está el sello.** *(30s)*
   **Si este recorrido no se puede hacer de corrido sin tocar código ni recargar a mano, el front no
   está terminado.** Es la única prueba que importa de verdad.
4. **Guardar el recorrido completo** en `docs/visual/pitch/` — una captura por paso, en orden y
   numeradas. Sirve de respaldo si algo falla en vivo.
5. Correr el detector mecánico sobre todo lo tocado.
6. Volver a correr `/impeccable document` para **actualizar DESIGN.md con los tokens reales que
   sobrevivieron a la implementación** y generar `.impeccable/design.json`. Esta es la única vez en
   el plan que se reescribe DESIGN.md, y se hace **entre las dos**.
7. Escribir en PROJECT.md §15 una fila de bitácora: fecha, "front terminado contra mock data",
   y el motivo.

---

## 12. Registro de sesiones

Cada una llena su fila al cerrar la sesión. **Una sesión sin fila no está cerrada.**

| # | Sesión | Dueña | Estado | VP corrido | Detector | Criticada por | Notas / tiempo medido |
|---|---|---|---|---|---|---|---|
| S0 | Andamiaje | Lara | ⬜ | n/a | n/a | — | |
| S1L | Tokens y `/diseno` | Lara | ⬜ | ⬜ | ⬜ | Malen (bloqueante) | |
| S1M | Mock data + DevSwitcher | Malen | ✅ | n/a | n/a | Lara | Completado |
| S2L | Onboarding | Lara | ⬜ | ⬜ | ⬜ | Malen | tiempo de onboarding: ___ s |
| S2M | Shell + carga de propuesta | Malen | ⬜ | ⬜ | ⬜ | Lara | |
| S3L | Feed | Lara | ⬜ | ⬜ | ⬜ | Malen | |
| S3M | Panel del diputado | Malen | ⬜ | ⬜ | ⬜ | Lara | prueba de los 2 metros: ⬜ |
| S4L | Detalle + respuesta | Lara | ⬜ | ⬜ | ⬜ | Malen | |
| S4M | Sapucais + editor de respuesta | Malen | ⬜ | ⬜ | ⬜ | Lara | |
| S5L | Grabador | Lara | ⬜ | ⬜ | ⬜ | Malen | probado en Android real: ⬜ |
| S5M | Cola de moderación | Malen | ⬜ | ⬜ | ⬜ | Lara | |
| S6L | Notificaciones | Lara | ⬜ | ⬜ | ⬜ | Malen | |
| S6M | Mapa por departamento 🟡 | Malen | ⬜ | ⬜ | ⬜ | Lara | |
| S7L | Pulido ciudadano | Lara | ⬜ | ⬜ | ⬜ | Malen | Lighthouse: ___ / ___ |
| S7M | Pulido backoffice | Malen | ⬜ | ⬜ | ⬜ | Lara | |
| S8 | Integración y pitch | Las dos | ⬜ | ⬜ | ⬜ | — | recorrido del pitch: ___ s |

---

## 13. Bitácora de choques

Todo lo que una necesitó del territorio de la otra, todo componente duplicado con `.local`, todo
campo agregado a `types.ts`, y todo hallazgo de una crítica cruzada se escribe acá. **Una línea por
cosa, con fecha y quién.** Es lo que se resuelve en S8.

| Fecha | Quién | Qué | Estado |
|---|---|---|---|
| 2026-08-01 | Malen | Monta `DevSwitcher` en `app/layout.tsx` (territorio de Lara), única edición prevista | hecho |
| | | | |

---

## 14. Definición de terminado del front

El front está terminado cuando **todo** esto es cierto:

- [ ] Las 10 pantallas existen, navegables de punta a punta, contra mock data.
- [ ] Cada una tiene sus 4 estados diseñados: con datos, vacío, cargando, error.
- [ ] Protocolo VP corrido y capturado en las 10, con sus screenshots commiteados.
- [ ] Cada pantalla fue criticada por la otra persona, y sus hallazgos están resueltos o anotados.
- [ ] Cero scroll horizontal en 360, 375, 412, 1440 y 1920.
- [ ] Cero `box-shadow` en superficies. Cero párrafos sobre campo índigo. Cero rellenos dorados.
- [ ] Cero errores y warnings en consola. `pnpm build` limpio.
- [ ] `prefers-reduced-motion` respetado en todo movimiento.
- [ ] El onboarding se completa en menos de 40 segundos, medido.
- [ ] El panel del diputado se lee a 2 metros en 1920×1080.
- [ ] El recorrido del pitch se hace de corrido, sin tocar código, con la campanita apareciendo
      al final.
- [ ] `lib/mock/api.citizen.ts` y `api.backoffice.ts` son la **única** frontera con los datos:
      ninguna pantalla importa `data.ts` directamente. El backend se enchufa cambiando esos dos
      archivos y nada más.
