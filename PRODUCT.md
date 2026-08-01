# Product

<!-- impeccable:product-schema 1 -->

> Derivado de [PROJECT.md](PROJECT.md), que sigue siendo la única fuente de verdad del proyecto.
> Este archivo existe para el sistema de diseño: captura la verdad de producto que las decisiones
> visuales necesitan. Si algo choca con PROJECT.md, gana PROJECT.md.

## Platform

web

## Users

**Primario — el Ciudadano correntino.** Adulto con un celular Android de gama media, datos
limitados, casi siempre parado o en movimiento (colectivo, cola, patio), a menudo al sol. No es un
usuario de software: es alguien que se enteró de algo que le afecta y quiere decir lo que piensa.
No está cómodo redactando; hablar le sale natural. Su sesión dura entre 40 segundos y 3 minutos.
Su trabajo: entender qué se está tratando en la Cámara y dejar su opinión hablando.

**Secundario — el Equipo de Cámara.** Personal administrativo, escritorio, sesiones largas. Carga
proyectos de ley, revisa lo que la IA propuso, modera lo que la IA marcó dudoso. Su trabajo:
publicar rápido sin publicar algo mal resumido.

**Secundario — el Diputado.** Pantalla grande, sesión corta y de alto riesgo: mira el panel de una
propuesta antes de votarla o de responder en público. Su trabajo: entender en un minuto qué piensa
su gente, y contestar sin que le lean una barbaridad.

## Product Purpose

SapucAI reconecta al ciudadano correntino con la Cámara de Diputados de la Provincia de Corrientes
en las dos direcciones. La información legislativa ya es pública; el problema es de **distribución
y traducción**. La app avisa al ciudadano de lo que se está tratando en los temas que eligió, se lo
explica en criollo, le deja gritar su opinión en una nota de voz de 15 segundos, y le devuelve la
respuesta pública de su diputado.

Éxito = **el ciclo se cierra**: el ciudadano ve que su sapucai llegó y fue contestado. Un ciclo que
no cierra es una app de encuestas más.

## Positioning

Cualquier app puede recibir opiniones. SapucAI **devuelve una respuesta**, y la entrada es la voz,
no un formulario. Un *sapucai* es el grito guaraní: acá es literal, una nota de voz. La IA traduce
el lenguaje legislativo al criollo para el ciudadano, y traduce 500 gritos en 5 argumentos para el
diputado. Ese doble sentido de traducción es lo que un competidor no puede copiar y pegar.

## Operating Context

El ciclo completo, que es el producto:

1. El Equipo de Cámara publica un proyecto → IA lo resume en lenguaje llano y lo categoriza.
2. El Ciudadano recibe aviso solo de los temas que eligió; lee el resumen; si no entiende, pregunta.
3. El Ciudadano graba su sapucai → IA transcribe, modera, clasifica postura, agrupa argumentos.
4. El Diputado abre su panel: termómetro de posturas, argumentos dominantes, origen por departamento.
5. El Diputado responde en público sobre esa propuesta.
6. Al Ciudadano le llega el aviso: "tu diputado respondió". Vuelve al paso 2.

Escenas físicas reales: el celular al sol, a una mano, con el pulgar; y el panel del diputado en un
monitor grande, en una oficina, proyectado durante una demo.

## Capabilities and Constraints

**Puede:** registro/login, onboarding con DNI + departamento + intereses, feed filtrado por
intereses, detalle de propuesta con resumen en criollo, grabación de audio en el navegador,
transcripción, moderación y clasificación de postura, panel analítico del diputado, respuesta
pública del diputado, notificación in-app con campanita.

**No hace (fuera del MVP, no se construye):** verificación de identidad contra RENAPER, scraping de
la web oficial, respuestas 1-a-1, votaciones vinculantes, app nativa, multi-provincia, historial de
votos del diputado, notificaciones por WhatsApp.

**Constraints técnicos:** Next.js 15 App Router, un solo deploy. Supabase (Postgres, Auth, Storage,
Realtime). **Gemini** para audio→texto (Bedrock **no** hace speech-to-text). Amazon Bedrock
(Claude) para resumir, categorizar, moderar, clasificar postura, agrupar y responder dudas. Cinco
prompts separados con salida JSON. Categorías de un **catálogo cerrado** — la IA elige de una lista,
no inventa etiquetas. Si la IA falla, la app **degrada**: estado "pendiente de análisis", nunca un
500. La IA sugiere, la persona aprueba.

**Constraints de proyecto:** HackIAthon Devlights 2026, ~24 horas, 3-4 personas. Mobile-first
siempre, excepto el panel del diputado que se diseña para pantalla grande.

## Brand Commitments

- **Nombre:** SapucAI. Del guaraní *sapukái*, el grito. La palabra es el producto: la acción central
  de la app se llama "mandar un sapucai".
- **Ámbito:** Cámara de Diputados de la Provincia de Corrientes. Institución real, caso real.
- **Voz:** el criollo correntino, no el lenguaje legislativo ni el lenguaje de producto. El resumen
  de una ley tiene que sonar a alguien explicándotela, no a un boletín oficial.
- Roles y términos del dominio que no se renombran: *sapucai*, *propuesta*, *postura*
  (a favor / en contra / neutro), *departamento*, *diputado*, *Equipo de Cámara*.

## Evidence on Hand

- ~20 proyectos de ley **ficticios pero realistas** de seed, más carga manual del admin.
  No hay scraping de datos reales de la Cámara.
- Los 25 departamentos de Corrientes (dato real).
- Catálogo cerrado de intereses/categorías (salud, educación, seguridad, ...) — a definir.
- **No existe** ninguna métrica de uso real, ningún usuario real, ningún testimonio, ningún
  respaldo institucional. Nada de eso se puede afirmar ni insinuar en la interfaz. Todos los datos
  visibles durante el desarrollo del front son **mock, y se etiquetan como tales** donde un
  observador podría confundirlos con reales.

## Product Principles

1. **El ciclo antes que las features.** Si hay que sacrificar algo, nunca el cierre del ciclo
   (respuesta del diputado → aviso al ciudadano).
2. **Hablar, no redactar.** La voz es la entrada primaria. Escribir es la alternativa, no al revés.
3. **La IA sugiere, la persona aprueba.** Nada generado por IA se publica sin revisión humana.
4. **Degradar, nunca explotar.** Toda pantalla tiene su estado pendiente, vacío y de error diseñado.
5. **Un pulgar y 40 segundos.** El onboarding del ciudadano se completa en menos de 40 segundos;
   cada segundo ahí es un usuario que se va.

## Accessibility & Inclusion

Público general, no técnico, con alfabetización digital variable y algunos con dificultad para
redactar — por eso la voz es la entrada primaria y **siempre tiene que existir una alternativa de
texto**. Se usa al sol en un celular: el contraste es funcional, no decorativo (objetivo WCAG AA,
AAA en el cuerpo de texto donde se pueda). Objetivos táctiles de 44px mínimo, todo alcanzable con el
pulgar. El audio nunca es el único portador de información: todo sapucai muestra su transcripción.
Soporte de `prefers-reduced-motion` obligatorio.
