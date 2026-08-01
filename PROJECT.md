# Sapucái — Documento Maestro del Proyecto

> **Equipo SapucAI · Grupo 23 · HackIAthon Devlights 2026**
> Temática: **Modernización del Sector Público**
> Este archivo es la **única fuente de verdad** del proyecto. Si algo que estás por construir
> no está acá, primero se discute y se escribe acá, después se codea.

---

## 1. El problema

La Cámara de Diputados de la Provincia de Corrientes publica todo lo que trata: proyectos de ley,
declaraciones, sesiones. Está todo ahí, público, disponible.

**Nadie entra.**

No es un problema de transparencia — la información existe. Es un problema de **distribución y
traducción**. El ciudadano no sabe qué se está tratando, y si lo supiera, el texto está escrito en
un idioma que no es el suyo. Y en el sentido inverso: el diputado no tiene ningún canal estructurado
para saber qué piensa su gente sobre un proyecto concreto **antes** de votarlo. Tiene encuestas
caras, redes sociales ruidosas, y el rumor del comité.

El vínculo entre el ciudadano correntino y su representante hoy está roto en las dos direcciones.

---

## 2. La solución en una frase

> **Sapucái es la app donde el correntino se entera de lo que se está tratando en la Cámara,
> grita su opinión en 15 segundos, y recibe la respuesta de su diputado.**

Un *sapucai* es el grito guaraní. Acá es literal: **una nota de voz.** El ciudadano no escribe un
formulario — grita. Hablar es más rápido, más honesto y más accesible que escribir, sobre todo
en un celular y sobre todo para gente que no está cómoda redactando.

La IA hace el trabajo pesado en las dos puntas:
- Traduce el lenguaje legislativo al criollo, para que el ciudadano entienda.
- Traduce 500 gritos en 5 argumentos, para que el diputado pueda leerlos.

---

## 3. El ciclo (esto ES el producto)

El diferencial de Sapucái no es el feed ni el audio. Es que **el ciclo se cierra**.
Cualquier app puede recibir opiniones. La nuestra devuelve una respuesta.

```
  [1] El Equipo de Cámara publica un proyecto
            │
            ├─ IA: genera un resumen en lenguaje llano
            └─ IA: lo categoriza por tema (salud, educación, seguridad...)
            ▼
  [2] El Ciudadano recibe un aviso — solo de los temas que eligió
            │
            └─ Lee el resumen. Si no entiende, le pregunta a la IA.
            ▼
  [3] El Ciudadano graba su SAPUCAI (o escribe, si prefiere)
            │
            ├─ IA: transcribe el audio
            ├─ IA: modera (insultos, spam, discurso de odio)
            ├─ IA: clasifica la postura → a favor / en contra / neutro
            └─ IA: agrupa las N opiniones en los argumentos dominantes
            ▼
  [4] El Diputado abre su panel y ve
            │   · el termómetro: 68% en contra
            │   · los 5 argumentos que más se repiten
            │   · de qué departamentos vino cada postura
            ▼
  [5] El Diputado responde en público sobre esa propuesta
            │
            ▼
  [6] Al Ciudadano le llega: "tu diputado respondió tu sapucai"
            │
            └──────────► vuelve a [2]
```

**En la demo, el momento wow son los pasos [5] y [6].** Todo lo anterior es infraestructura para
llegar ahí. Si tenés que sacrificar algo, nunca sacrifiques el cierre del ciclo.

---

## 4. Los tres actores

| Rol | Quién es | Qué hace en la app |
|-----|----------|--------------------|
| **Ciudadano** | Correntino con un celular | Se registra, elige sus temas de interés, recibe propuestas, manda sapucais, lee las respuestas |
| **Equipo de Cámara** | Personal administrativo de la Cámara | Carga los proyectos, dispara el procesamiento IA, modera lo que la IA marcó dudoso |
| **Diputado** | El representante | Ve el panel analítico de su(s) propuesta(s) y publica la respuesta pública |

El Equipo de Cámara y el Diputado comparten el mismo backoffice, con permisos distintos:
el equipo **carga y modera**, el diputado **lee y responde**. Ningún rol puede editar el sapucai
de un ciudadano — solo ocultarlo si viola las normas, y queda registrado quién lo ocultó.

---

## 5. Decisiones tomadas (y por qué)

Estas decisiones ya están cerradas. Si querés cambiar una, se discute con el equipo, no se
cambia en silencio en tu rama.

| Decisión | Qué elegimos | Por qué |
|----------|--------------|---------|
| **Ámbito** | Cámara de Diputados de Corrientes | Caso real, concreto, defendible. El nombre del producto sale de ahí. |
| **Origen de datos** | Seed ficticio realista (~20 proyectos) + carga manual del admin | Cero riesgo de scraping. El admin puede cargar uno en vivo durante el pitch. |
| **Chatbot** | Híbrido: feed personalizado + preguntar sobre UNA propuesta | Un chat abierto es un pozo sin fondo. Acotado a una propuesta, la IA no alucina y el valor se ve. |
| **Identidad** | DNI + localidad autodeclarados (sin validar contra RENAPER) | Permite segmentar por departamento y da peso al dato, sin depender de una integración externa imposible en 24hs. |
| **Base de datos** | **Supabase** como DB real; RDS de la hackatón como respaldo | Ver §7 — es un riesgo abierto, leelo. |
| **Stack** | Next.js 15 App Router, fullstack, un solo deploy | Un repo, un deploy, PWA nativa, Server Actions como backend. Menos superficie de error. |
| **Respuesta del diputado** | Pública, sobre la propuesta, le llega a todos los que opinaron | Escala, y es lo que se muestra en la demo. El 1-a-1 no escala ni entra en el tiempo. |
| **Notificaciones** | In-app (campanita) en el núcleo; **Web Push como mejora posterior** | Ver §9. El push es el feature más vistoso y el que más tiempo se come. |

---

## 6. Arquitectura

### 6.1 Diagrama

```
                    ┌──────────────────────────────┐
                    │   PWA — Next.js 15 (App Router)
                    │   mobile-first, instalable    │
                    └──────────────┬───────────────┘
                                   │
                   Server Actions / Route Handlers
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
┌───────────────┐        ┌──────────────────┐      ┌────────────────────┐
│   SUPABASE    │        │ AMAZON TRANSCRIBE│      │  AMAZON BEDROCK    │
│               │        │                  │      │  (Claude)          │
│ · Postgres    │        │  audio → texto   │      │                    │
│ · Auth (RLS)  │        │  es-AR           │      │ · resumir ley      │
│ · Storage     │        └──────────────────┘      │ · categorizar      │
│   (audios)    │                                  │ · moderar + postura│
│ · Realtime    │                                  │ · agrupar argumentos│
└───────────────┘                                  │ · responder dudas  │
                                                   └────────────────────┘
                              DEPLOY: AWS Amplify Hosting
```

### 6.2 Por qué cada pieza

- **Next.js App Router, un solo servicio.** No hay backend separado. Las Server Actions escriben
  en Supabase y llaman a AWS con las credenciales del servidor. Nada de claves de AWS en el browser,
  nunca. Un solo deploy en Amplify, cero CORS, cero coordinación entre repos.

- **Supabase.** Es Postgres, igual que el RDS de la consigna, así que el esquema es portable.
  Nos regala tres cosas que en 24hs no queremos construir: Auth con sesiones, Storage para los
  audios, y Realtime. **Realtime es un regalo para la demo**: el panel del diputado se actualiza
  solo mientras el público manda sapucais desde sus celulares. Eso se vende solo.

- **Amazon Transcribe, no Bedrock, para el audio.**
  ⚠️ **Bedrock no hace speech-to-text.** No hay modelo de transcripción ahí. Es otro servicio,
  otro cliente SDK (`@aws-sdk/client-transcribe`), otro permiso IAM. Descubrirlo el sábado a la
  noche cuesta tres horas. Descubrirlo ahora cuesta cero.

- **Bedrock (Claude) para todo lo demás.** Cinco trabajos, **cinco prompts separados**. No hay un
  "prompt maestro" que haga todo junto: cada tarea tiene su prompt, su formato de salida y su
  manejo de error. Un prompt que hace cinco cosas falla en las cinco.

### 6.3 Estructura de carpetas

```
/app
  /(citizen)          → onboarding, feed, detalle de propuesta, notificaciones
  /(backoffice)       → carga de propuestas, moderación, panel del diputado
  /api                → route handlers (webhooks, procesamiento asíncrono)
/components
  /ui                 → primitivos compartidos (botón, card, chip, sheet)
  /citizen            → recorder de audio, tarjeta de propuesta, termómetro
  /backoffice         → tabla de sapucais, gráficos, editor de respuesta
/lib
  /supabase           → clientes (browser / server), tipos generados
  /ai
    bedrock.ts        → cliente único de Bedrock
    transcribe.ts     → cliente de Transcribe
    prompts/          → UN archivo por tarea de IA (ver §8)
  /domain             → lógica de negocio pura, testeable sin red
/supabase
  /migrations         → SQL versionado
  seed.sql            → los ~20 proyectos ficticios + departamentos
```

**Regla de oro:** la lógica de negocio vive en `/lib/domain` y no sabe que existen React,
Supabase ni AWS. Recibe datos, devuelve datos. Eso es lo único que se puede testear rápido.

---

## 7. ⚠️ Riesgo abierto: la base de datos

El README de la hackatón nos da un **PostgreSQL en RDS**, con este aviso:

> *"La base de datos solo es accesible desde las oficinas de Devlights."*

Eso rompe dos cosas: no podés desarrollar desde tu casa, y **Amplify no va a poder alcanzarla**
al desplegar, porque el deploy corre en la nube, no en la oficina.

**Nuestro plan:**

- **Plan A (el que ejecutamos):** Supabase es la base real. Accesible desde cualquier lado,
  funciona en el deploy, nos da Auth y Storage.
- **Plan B (si la organización exige el RDS):** el esquema es Postgres estándar y no usa nada
  exclusivo de Supabase en las tablas. Migrar es `pg_dump` y `psql` desde una máquina en la
  oficina. **Costo estimado: 30-45 minutos.** Por eso hay que mantener las migraciones limpias
  en `/supabase/migrations` desde el minuto uno.

**Acción pendiente:** preguntarle a la organización si el uso del RDS es obligatorio o sugerido.
Hacer esta pregunta temprano — la respuesta cambia el plan de las últimas horas.

---

## 8. Las cinco tareas de IA

Cada una es un prompt independiente en `/lib/ai/prompts/`. Todas devuelven **JSON estructurado**,
nunca prosa libre — el código tiene que poder parsear la salida sin adivinar.

| # | Tarea | Entrada | Salida | Cuándo corre |
|---|-------|---------|--------|--------------|
| 1 | **Resumir** | Texto del proyecto de ley | Resumen de 3-4 oraciones en lenguaje llano correntino, sin tecnicismos | Al publicar la propuesta |
| 2 | **Categorizar** | Título + texto del proyecto | 1 a 3 categorías del catálogo cerrado | Al publicar la propuesta |
| 3 | **Moderar + clasificar postura** | Transcripción del sapucai | `{ apto: bool, motivo: string, postura: "a_favor"\|"en_contra"\|"neutro" }` | Al recibir un sapucai |
| 4 | **Agrupar argumentos** | Todas las transcripciones aptas de una propuesta | Los 3-5 argumentos dominantes, con cuántas personas lo dijeron | On-demand desde el panel |
| 5 | **Responder dudas** | Pregunta del ciudadano + texto de ESA propuesta | Respuesta corta, y "no lo dice el proyecto" si no está en el texto | En el chat de la propuesta |

**Reglas para las cinco:**
- Las categorías salen de un **catálogo cerrado**. La IA elige de una lista, no inventa etiquetas.
  Si inventa, el matcheo con los intereses del usuario se rompe.
- Si Bedrock falla o tarda, **la app no se cae**: la propuesta queda sin resumen y el sapucai queda
  "pendiente de análisis". Estado degradado, no error 500.
- El prompt #5 tiene prohibido responder con conocimiento general. Solo con el texto de esa
  propuesta. Un chatbot legislativo que alucina una ley es un desastre de relaciones públicas.

---

## 9. Alcance: la línea de corte

Somos **3-4 personas y ~24 horas**. Esto no entra completo. La línea está trazada acá y es
explícita a propósito: para que nadie se entere a las 4 de la mañana de que estaba construyendo
lo que no era.

### 🟢 NÚCLEO — sin esto no hay demo

- [ ] Registro y login (email + password vía Supabase Auth)
- [ ] Onboarding: DNI, departamento, selección visual de intereses
- [ ] Backoffice: cargar una propuesta → dispara resumen + categorización IA
- [ ] Feed del ciudadano filtrado por sus intereses
- [ ] Detalle de propuesta con el resumen en criollo
- [ ] Grabar audio en el navegador y subirlo a Supabase Storage
- [ ] Transcripción con Amazon Transcribe
- [ ] Moderación + clasificación de postura con Bedrock
- [ ] Panel del diputado: termómetro a favor/en contra + lista de sapucais
- [ ] **Respuesta pública del diputado**
- [ ] **Notificación in-app (campanita) al ciudadano cuando el diputado responde**

Los dos últimos ítems cierran el ciclo. **Son lo último que se toca y lo primero que se protege.**

### 🟡 MEJORAS — en este orden, si sobra tiempo

1. **Web Push real (PWA)** — la notificación en la pantalla del celular con la app cerrada.
   Es el feature más vistoso que tenemos y merece existir. **No se toca antes de las 18 horas
   de haber arrancado.** Ojo: iOS exige que la PWA esté instalada en la pantalla de inicio para
   permitir push, y Android es mucho más amable. Para la demo, usar Android.
2. **Agrupación de argumentos por IA** (prompt #4) — convierte una lista de opiniones en insight real
3. **Chat sobre la propuesta** (prompt #5) — "explicame esta ley"
4. **Mapa de Corrientes por departamento** — visualmente potentísimo en el panel
5. **Realtime** — el panel se actualiza en vivo mientras el público opina
6. Alternativa de texto al audio (escribir en vez de grabar)

### 🔴 FUERA DEL MVP — no se construye, se menciona en el pitch como visión

Verificación de identidad contra RENAPER · scraping de la web oficial de la Cámara ·
respuestas 1-a-1 · votaciones vinculantes · app nativa · multi-provincia ·
historial de votos del diputado · notificaciones por WhatsApp

---

## 10. Modelo de datos

```sql
-- Catálogo cerrado. Sin esto, el matcheo se rompe.
interests (id, slug, nombre, icono)
departamentos (id, nombre)          -- los 25 departamentos de Corrientes

profiles (id → auth.users, rol, nombre, dni, departamento_id, created_at)
  rol ∈ { 'ciudadano', 'equipo_camara', 'diputado' }

user_interests (user_id, interest_id)

proposals (
  id, titulo, texto_original, resumen_ia, estado,
  autor_diputado_id, publicada_at
)
  estado ∈ { 'borrador', 'procesando', 'publicada', 'cerrada' }

proposal_interests (proposal_id, interest_id)   -- lo que escribe la IA #2

sapucais (
  id, proposal_id, user_id,
  audio_url,            -- null si escribió en vez de grabar
  transcripcion,
  postura,              -- 'a_favor' | 'en_contra' | 'neutro' | null si pendiente
  moderacion_ok,        -- null = pendiente, true = apto, false = ocultado
  moderacion_motivo,
  estado_procesamiento, -- 'pendiente' | 'listo' | 'error'
  created_at
)

responses (id, proposal_id, diputado_id, texto, audio_url, created_at)

notifications (id, user_id, tipo, proposal_id, leida, created_at)
  tipo ∈ { 'nueva_propuesta', 'respuesta_diputado' }
```

**El matcheo es deliberadamente simple:**
`user_interests ∩ proposal_interests → notificación`.
Sin embeddings, sin búsqueda semántica, sin vectores. Es un `JOIN`. Es explicable en el pitch en
una oración, es instantáneo, y funciona. La sofisticación acá no compra nada.

**Seguridad (RLS en Supabase):** un ciudadano solo lee sus propias notificaciones y sus propios
sapucais completos; ve los ajenos solo agregados. El backoffice lee todo lo que pasó moderación.
Nadie edita el sapucai de otro.

---

## 11. Las pantallas

Todo es **mobile-first**. El MVP se diseña para una mano y un pulgar. El escritorio es un
mobile centrado — no se pierde un minuto en layouts de desktop, **excepto el panel del diputado**,
que sí se ve en una pantalla grande porque ahí hay gráficos.

### Ciudadano

1. **Onboarding** — bienvenida, DNI + departamento, y una grilla de chips grandes con los temas.
   Tiene que poder completarse en menos de 40 segundos. Cada segundo acá es un usuario que se va.
2. **Feed** — tarjetas de propuestas de sus temas. Título, resumen de dos líneas, chips de tema,
   y el estado ("124 sapucais · el diputado respondió").
3. **Detalle** — el resumen en criollo arriba, un **botón grande de grabar** abajo fijo, y la
   respuesta del diputado destacada si existe.
4. **Grabación** — presionar y hablar, con waveform visible. Escuchar antes de enviar. Reintentar.
   Enviar. Nada más.
5. **Notificaciones** — la campanita con badge.

### Backoffice

6. **Carga de propuesta** — pegás el texto, la IA propone resumen y categorías, el humano revisa
   y corrige antes de publicar. **La IA sugiere, la persona aprueba.** Nunca al revés.
7. **Panel del diputado** — el termómetro (a favor / en contra / neutro), los argumentos agrupados,
   la lista de sapucais con su audio reproducible, y el editor de la respuesta pública.
8. **Moderación** — cola de lo que la IA marcó dudoso, para que un humano decida.

---

## 12. Reparto de trabajo

Cuatro carriles con poco solapamiento. Cada uno es dueño de sus archivos.

| Carril | Territorio | Entregable |
|--------|-----------|------------|
| **A — Cimientos y datos** | `/supabase`, `/lib/supabase`, Auth, RLS, seed | Que todos puedan leer y escribir datos reales desde la hora 3 |
| **B — Ciudadano** | `/app/(citizen)`, `/components/citizen` | Onboarding, feed, detalle, grabador de audio |
| **C — IA** | `/lib/ai`, los 5 prompts, Transcribe, Bedrock | Funciones puras: entra texto/audio, sale JSON. Testeables sin UI. |
| **D — Backoffice y deploy** | `/app/(backoffice)`, Amplify, variables de entorno | Carga de propuestas, panel, respuesta, y que el deploy exista temprano |

**Reglas de convivencia:**
- **El carril A arranca solo y va primero.** Nadie puede avanzar de verdad sin el esquema.
  Hasta que exista, los demás trabajan contra datos falsos en memoria.
- **El carril C no toca la UI.** Expone funciones. El carril B y D las llaman.
- **El carril D despliega en Amplify en las primeras 4 horas, con la app vacía.**
  Un deploy que se arregla a las 3 de la mañana es un proyecto que no se presenta.
- Ramas por carril, merge a `dev` seguido. `main` se toca solo para entregar.
- Si tocás algo de otro carril, avisá. Si cambiás una decisión de este documento, **actualizá este documento.**

---

## 13. Configuración

Variables de entorno (`.env.local`, **jamás commiteado**):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # solo servidor. Nunca con prefijo NEXT_PUBLIC_.
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=                # solo servidor
AWS_SECRET_ACCESS_KEY=            # solo servidor
BEDROCK_MODEL_ID=
```

⚠️ **Cualquier variable con `NEXT_PUBLIC_` viaja al navegador y es pública.** Las credenciales de
AWS y la service role de Supabase van sin ese prefijo y se usan **solo** en Server Actions y Route
Handlers. Si una clave de AWS llega al bundle del cliente, cualquiera puede gastar la cuota de
Bedrock del equipo.

⚠️ El `README.md` de este repo **ya tiene credenciales commiteadas** (venían así de la organización).
No agregues más. Si rotan alguna, avisá al equipo.

---

## 14. Guion del pitch

El orden importa. La demo cuenta el ciclo, no las features.

1. **El dolor (20s)** — abrir la web real de la Cámara de Corrientes. Mostrarla. Preguntar:
   *"¿alguno entró alguna vez?"*
2. **La carga (30s)** — el Equipo de Cámara pega un proyecto de ley real. La IA lo resume en
   criollo delante del jurado.
3. **El ciudadano (45s)** — celular en mano. Llega el aviso. Abre. Lee el resumen que entiende.
   **Graba su sapucai en voz alta, en vivo.**
4. **El panel (30s)** — la pantalla grande. El termómetro se mueve. Los argumentos agrupados.
   *"Esto el diputado hoy no lo tiene."*
5. **El cierre del ciclo (30s)** — el diputado responde. **La notificación aparece en el celular
   que está proyectado.** Ese es el momento. Ahí se gana o se pierde.
6. **La visión (15s)** — una provincia hoy, veintitrés mañana.

Si el jurado puede mandar su propio sapucai desde su celular durante la demo, **hacelo**.
Con Realtime, el panel se mueve solo mientras hablás. Nada convence más que eso.

---

## 15. Bitácora de decisiones

Cada cambio de rumbo se anota acá, con fecha y motivo. Esto es la memoria del proyecto.

| Fecha | Decisión | Motivo |
|-------|----------|--------|
| 2026-08-01 | Documento maestro inicial | Alinear al equipo antes de escribir código |
| 2026-08-01 | Web Push sale del núcleo, queda como mejora prioritaria | 24hs y 3-4 personas. Se retoma pasadas las 18hs si el ciclo ya cierra. |
| 2026-08-01 | Supabase como DB, RDS como respaldo | El RDS solo es accesible desde las oficinas de Devlights; rompe el deploy en Amplify |
| 2026-08-01 | Amazon Transcribe para el audio, no Bedrock | Bedrock no ofrece speech-to-text |
