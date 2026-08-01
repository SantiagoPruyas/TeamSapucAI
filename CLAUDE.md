# Contexto para asistentes de IA — Proyecto Sapucái

**Antes de responder cualquier cosa sobre este proyecto, leé [PROJECT.md](PROJECT.md).**
Ese archivo es la única fuente de verdad: qué construimos, por qué, qué está dentro del
alcance y qué está explícitamente fuera.

## Resumen de una línea

PWA mobile-first que conecta al ciudadano correntino con la Cámara de Diputados de la
Provincia de Corrientes: recibe propuestas legislativas resumidas por IA según sus intereses,
responde con una nota de voz (*sapucai*), y recibe la respuesta pública del diputado.

## Stack

- **Next.js 15 App Router** — fullstack, un solo deploy. Server Actions como backend.
- **Supabase** — Postgres, Auth (RLS), Storage (audios), Realtime.
- **Amazon Transcribe** — audio → texto (`es-AR`).
- **Amazon Bedrock (Claude)** — resumen, categorización, moderación, postura, agrupación.
- **AWS Amplify Hosting** — deploy.

## Reglas no negociables

1. **Bedrock no hace speech-to-text.** La transcripción es Amazon Transcribe. No propongas
   transcribir con Bedrock.
2. **Ninguna credencial de AWS ni la service role de Supabase toca el cliente.** Todo lo que
   lleve `NEXT_PUBLIC_` es público. AWS y service role van solo en Server Actions / Route Handlers.
3. **Cada tarea de IA es un prompt separado** en `/lib/ai/prompts/`, con salida JSON estructurada.
   No hay prompt maestro que haga varias cosas.
4. **Las categorías salen de un catálogo cerrado.** La IA elige de una lista, no inventa etiquetas
   — si inventa, el matcheo con los intereses del usuario se rompe.
5. **Si la IA falla, la app degrada, no explota.** Estado "pendiente de análisis", nunca un 500.
6. **El chat sobre una propuesta responde solo con el texto de esa propuesta.** Si la respuesta no
   está ahí, dice "no lo dice el proyecto". Nunca conocimiento general sobre leyes.
7. **La lógica de negocio vive en `/lib/domain`** y no conoce React, Supabase ni AWS.
8. **La IA sugiere, la persona aprueba.** El resumen y las categorías de una propuesta pasan por
   revisión humana antes de publicarse.
9. **Mobile-first siempre**, excepto el panel del diputado, que se diseña para pantalla grande.
10. **El esquema se mantiene como Postgres estándar** y las migraciones versionadas en
    `/supabase/migrations`, para poder migrar al RDS de la hackatón si lo exigen.

## Alcance

El alcance está congelado en §9 de [PROJECT.md](PROJECT.md), dividido en núcleo 🟢, mejoras 🟡 y
fuera del MVP 🔴. **No propongas ni construyas nada de la lista roja.** Si algo del núcleo ya está,
seguí por la lista amarilla **en el orden escrito**.

## Si cambia una decisión

Actualizá [PROJECT.md](PROJECT.md) y agregá una fila a la bitácora de §15. Una decisión que solo
vive en la cabeza de alguien no es una decisión del equipo.
