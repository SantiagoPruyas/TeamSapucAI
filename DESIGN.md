---
name: SapucAI
description: El puente celeste — un arco que conecta la voz del ciudadano con la Cámara, sobre fondo blanco, con el Capitolio correntino de fondo.
---

<!-- SEED: reemplaza a "El Estandarte" (852e285a) el 2026-08-01, a partir de public/prototype.jpeg
     provisto por el equipo. Ver PROJECT.md §15 para el motivo del cambio de rumbo. -->

# Design System: SapucAI

## Overview

**Creative North Star: "El Puente"**

Un puente celeste tendido entre el ciudadano y la Cámara de Diputados. El isotipo es literal:
un arco en degradé de celeste a índigo, con una franja blanca cosida en el medio — es el gesto
visual de "tu voz llega a la Cámara". Debajo del arco, el Capitolio correntino dibujado en línea
fina flota sobre una cinta de agua celeste ondulada: la institución es de fondo, cercana pero no
opresiva. Todo pasa sobre blanco. El color no ocupa campos — ocupa acentos: el arco, los botones,
los textos de marca.

La traducción al producto: el ciudadano vive en tarjetas blancas flotantes de esquinas muy
redondeadas, con acciones primarias en píldoras de azul índigo sólido y acciones secundarias en
píldoras de contorno. La jerarquía se construye con peso tipográfico y color de texto, no con
campos de color de fondo. Es el registro visual de una app de servicio público que se siente
como cualquier app nativa de calidad — cercana, típica de iOS, sin fricción de aprendizaje.

**Rechazos confirmados:** el dashboard oscuro, el ángulo recto sin sombras, y el dorado como
ornamento (todo eso pertenecía a "El Estandarte", la dirección anterior — ver nota histórica al
final de este documento). Tampoco vale el azul institucional plano sin degradé: el arco necesita
su transición de dos tonos para leerse como puente, no como franja.

**Key Characteristics:**
- Fondo blanco puro como superficie por defecto; el color vive en acentos, no en campos
- Arco/isotipo en degradé celeste → índigo con franja blanca, motivo repetible en momentos de
  marca (splash, onboarding, estados vacíos)
- Radios grandes en todo: tarjetas ~24px, botones en píldora completa (999px)
- Sombras suaves permitidas — dan flotación a tarjetas y botones sobre el fondo blanco
- Ilustración de línea (ciudad, edificio, ondas de agua) como elemento decorativo de fondo en
  pantallas de marca, nunca como fondo de una pantalla de contenido denso
- Los temas de interés se distinguen por ícono y etiqueta, igual que antes — eso no cambió

## Colors

Paleta de puente: celeste de cielo arriba, índigo institucional abajo, y blanco en todas las
superficies de contenido.

### Primary
- **Índigo Oficial** (`#1B2A5E`, token `--indigo-campo`, se mantiene el nombre de variable por
  compatibilidad con el código ya escrito): el azul de marca. Wordmark "Sapuc", tagline, botón
  primario relleno, texto de títulos sobre blanco. Es el color que más autoridad carga.
- **Índigo Nocturno** (`#14204A`, token `--indigo-nocturno`): la variante más oscura. Reservada
  para el panel del diputado (la única pantalla con fondo oscuro, sin cambios respecto a antes) y
  para el extremo inferior del degradé del arco.

### Secondary
- **Celeste Puente** (`#4FA3E3`, token nuevo `--azul-cielo`): el extremo superior del degradé del
  arco, y el celeste del "AI" en el wordmark. Úsalo en gradientes, nunca como relleno sólido de una
  superficie grande.
- **Celeste Acento** (`#2E7FD6`, reemplaza el rol que tenía `--oro-filete` — se mantiene el nombre
  de variable por compatibilidad): enlaces, ícono activo, aro de foco, anillo de estados de marca
  (el equivalente celeste de lo que antes hacía el oro). Un hilo o un ícono, no un fondo.

### Tertiary
Tintas de postura — **sin cambios respecto a la dirección anterior**, siguen existiendo solo para
datos (campo dividido del termómetro, etiqueta de postura, contador). Nunca son fondo de una
superficie de UI genérica.
- **Verde Bandera** (`#1E6B45`): a favor.
- **Cochinilla** (`#A82418`): en contra.
- **Gris Pizarra** (`#77808F`): neutro, y también el estado "pendiente de análisis".

### Neutral
- **Lienzo** (`#F5F9FF`, token `--lienzo`): panel de lectura por defecto, casi blanco con un
  matiz celeste apenas perceptible. Todo texto largo vive acá o directamente sobre blanco puro.
- **Lienzo Hueso** (`#FFFFFF`, token `--lienzo-hueso`): blanco puro, para anidar una superficie
  dentro de otra sin que compitan.
- **Tinta** (`#16233D`, token `--tinta`): el texto principal. Nunca negro puro.
- **Tinta Tenue** (`#5B6B85`, token `--tinta-tenue`): texto secundario, subtítulos, metadatos.
- **Hilo** (`#E3E9F2`, token `--hilo`): bordes y divisiones sutiles.
- **Blanco Cosido** (`#FFFFFF`, token `--blanco-cosido`): texto sobre superficies de índigo
  (botón primario, headers oscuros).

### Named Rules

**La Regla del Arco.** El degradé celeste → índigo solo aparece en el isotipo y en momentos de
marca puntuales (splash, header de onboarding). No se usa como fondo de tarjetas ni de botones de
uso frecuente — ahí el índigo va sólido.

**La Regla de la Postura.** Sin cambios: Verde Bandera, Cochinilla y Gris Pizarra aparecen
únicamente en datos. Nunca como fondo de una tarjeta, un botón o una pantalla.

**La Regla de la Insignia.** Sin cambios: los temas de interés se distinguen por ícono y etiqueta,
nunca por color.

## Typography

**Display Font:** Archivo (variable) — con `system-ui, sans-serif` de respaldo
**Body Font:** Libre Franklin (variable) — con `system-ui, sans-serif` de respaldo

Se mantienen las mismas dos familias que en la dirección anterior — el cambio es de paleta y
forma, no de tipografía. Lo que cambia es el tracking: la nueva dirección es más cercana al
lenguaje nativo de iOS, así que el tracking extremo de mayúsculas condensadas se reserva para
el wordmark y los títulos de marca, no para cada headline de sección.

### Hierarchy
- **Display** (Archivo 700, `clamp(2rem, 9vw, 3.5rem)`, line-height 0.95): el wordmark y el
  título de las pantallas de onboarding/splash. Uno por pantalla.
- **Headline** (Archivo 600, 1.5rem, line-height 1.1): títulos de sección, tagline de splash.
- **Title** (Libre Franklin 600, 1.0625rem, line-height 1.35): títulos dentro de una tarjeta,
  nombre del diputado, encabezado de un sapucai.
- **Body** (Libre Franklin 400, 1rem, line-height 1.6, máximo 68ch): el resumen en criollo, las
  transcripciones, la respuesta del diputado. Nunca baja de 16px en el ciudadano.
- **Label** (Archivo 600, 0.6875rem, tracking `0.14em`, MAYÚSCULAS): insignias, etiquetas de
  postura, estados, encabezados de tabla del backoffice.
- **Data** (Libre Franklin 600, `font-variant-numeric: tabular-nums`): todo número que cambie o
  se compare — porcentajes del termómetro, cantidad de sapucais, contadores.

### Named Rules

**La Regla del Único Grito.** Sin cambios: un solo bloque en Display por pantalla.

**La Regla de los 16.** Sin cambios: el cuerpo del ciudadano nunca baja de 16px.

## Layout

Mobile-first en una columna, con el pulgar como única herramienta. Contenedor del ciudadano:
ancho completo hasta 480px, sobre **fondo blanco** (antes era campo índigo — ese es el cambio
más visible de este documento). **Excepción: el panel del diputado**, grilla de 12 columnas,
contenedor de 1280px, fondo oscuro, sin cambios respecto a la dirección anterior.

Ritmo de espaciado en múltiplos de 4: `4, 8, 12, 16, 24, 32, 48, 64`. Padding interno de una
tarjeta: 16px en mobile, 24px en escritorio.

La barra de acción del ciudadano sigue **fija al fondo**, con `env(safe-area-inset-bottom)`,
altura de 72px. Todo objetivo táctil mide 44px como mínimo.

Breakpoints: `sm 480px`, `md 768px`, `lg 1024px`, `xl 1280px`.

## Elevation & Depth

**Este sistema SÍ usa sombras — es el cambio de regla más importante frente a "El Estandarte".**
Las tarjetas y los botones primarios flotan sobre el blanco con una sombra suave y difusa
(`--sombra-suave`, ver globals.css). No es la sombra dura de Material ni el `box-shadow` por
defecto de un framework — es difusa, de baja opacidad, tono índigo (no gris neutro), para que la
profundidad se sienta parte de la misma paleta.

### Named Rules

**La Regla de la Sombra Tinta.** Cuando una superficie necesita despegarse del blanco, la sombra
es siempre `rgba(indigo, 0.08–0.16)`, nunca gris puro ni negro. Es lo que hace que la profundidad
se sienta de marca y no genérica.

**El panel del diputado sigue sin sombras propias** — ahí se mantiene la lógica de capas tonales
de la dirección anterior (Nocturno debajo de Campo debajo de Lienzo), porque es una pantalla de
datos densa donde la sombra compite con la lectura.

## Shapes

Radios grandes. Tarjetas y paneles: `--radius-base` ahora vale 20px (antes 2px). Botones:
píldora completa (`--radius-pill: 999px`) — el opuesto exacto de la regla anterior ("nada es una
pastilla"). Los inputs y los chips de tema usan un radio intermedio, ~14px.

Los círculos del sistema se mantienen: el sello de respuesta del diputado (48px feed / 72px
detalle) y las insignias de tema (40px) — esos no cambian de forma, solo de contexto (ahora
flotan sobre blanco, no sobre campo índigo).

La ilustración de línea (Capitolio, ondas de agua, nubes) es un elemento decorativo válido en
pantallas de marca (splash, onboarding) — algo explícitamente prohibido en la dirección anterior
("Don't dejar el gradiente... donde va un objeto dibujado en la gramática del estandarte"). Ya no
aplica: el gradiente y la ilustración realista SON la gramática de esta dirección.

## Do's and Don'ts

### Do:
- **Do** usar fondo blanco como superficie por defecto del ciudadano; el color vive en acentos.
- **Do** usar el degradé celeste→índigo solo en el isotipo y en momentos de marca puntuales.
- **Do** dar sombra suave (tono índigo, baja opacidad) a tarjetas y botones primarios.
- **Do** usar píldora completa en todo botón de acción primaria y secundaria.
- **Do** seguir dibujando el termómetro como campo dividido con las tintas de postura — esa regla
  no cambió, es de datos, no de marca.
- **Do** diseñar el estado vacío, el cargando y el error de cada pantalla junto con el de datos.
- **Do** mostrar siempre la transcripción de un sapucai, nunca solo el audio.
- **Do** respetar `prefers-reduced-motion`.
- **Do** marcar todo dato mock con su etiqueta de "dato de demostración".

### Don't:
- **Don't** usar el degradé como fondo de una tarjeta o un botón de uso frecuente — es de marca,
  no de superficie.
- **Don't** usar Cochinilla, Verde Bandera o Gris Pizarra como fondo de una superficie genérica.
- **Don't** asignarle un color de fondo a un tema de interés — sigue siendo ícono + etiqueta.
- **Don't** volver al radio de 2px ni al ángulo recto — esa regla quedó en "El Estandarte".
- **Don't** poner sombra dura, gris o negra — siempre tono índigo, siempre difusa.
- **Don't** meter dos bloques en Display en una misma pantalla.
- **Don't** presentar dato mock como si fuera real.

---

## Nota histórica: "El Estandarte"

Este documento reemplazó por completo a la dirección visual anterior, "El Estandarte" (campo
índigo de pantalla completa, filete dorado, radio 2px, cero sombras), el 2026-08-01, a partir de
`public/prototype.jpeg` provisto por el equipo. La decisión y su motivo están en la bitácora de
[PROJECT.md](PROJECT.md) §15. Los nombres de variables CSS se mantuvieron iguales donde fue
posible (`--indigo-campo`, `--oro-filete`, `--lienzo`, etc.) para no romper el código ya escrito
contra "El Estandarte" — sus **valores** cambiaron, sus **roles** se mantuvieron lo más parecido
posible. Cualquier componente construido antes de esta fecha se repinta solo con estos nuevos
tokens; los que tengan geometría dura de la dirección vieja (radio 2px explícito, banda de izada,
ausencia de sombra forzada) necesitan un repaso manual — no alcanza con el cambio de tokens.
