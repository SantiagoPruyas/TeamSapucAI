---
name: SapucAI
description: El estandarte cívico correntino — campos de tela saturada, filete dorado, y un sello cuando el diputado responde.
---

<!-- SEED: establecido con el equipo antes de implementar. Volver a correr /impeccable document
     cuando exista código, para capturar los tokens reales y generar el sidecar. -->

# Design System: SapucAI

## Overview

**Creative North Star: "El Estandarte"**

Un estandarte cívico del interior: la tela que se lleva en un acto público. Un campo de color
saturado que ocupa la pantalla entera, un filete dorado cosido al borde, un panel de lienzo crudo
donde se lee el texto largo, insignias bordadas por tema, y un sello — metal y cera — que aparece
solo cuando algo se volvió oficial. El estandarte es el objeto correcto porque es lo que la gente
levanta cuando quiere que se la escuche, y porque tiene exactamente las partes que este producto
necesita: un campo, una insignia, cintas que se le atan, y un sello.

La traducción al producto es literal y por eso funciona. **Cada propuesta es un estandarte.** Su
tema es una **insignia**. Cada sapucai que le llega es una **cinta** que se le ata, con su
transcripción a la vista. El termómetro de posturas es un **campo dividido** — una división
heráldica del campo, no un gráfico de barras pegado encima. Y la respuesta del diputado es el
**sello**: cae sobre el estandarte, y ese mismo sello es lo que muestra la campanita. El cierre del
ciclo tiene forma propia.

La estrategia de color es **Committed**: un solo color saturado, el índigo, carga entre el 30% y el
60% de cada pantalla como campo de fondo, no como acento. El texto largo nunca se lee sobre el
campo: se lee sobre un panel de lienzo. Esa separación es lo que permite que la app sea vistosa en
el proyector del pitch y legible en un celular al sol de Corrientes, que es la escena real.

**Rechazos confirmados:** ni la app cívica de neutros con azul institucional y chips redondeados
(el default de la categoría), ni su opuesto previsible, el dashboard oscuro con acento neón. El
dorado no es un color de relleno. La heráldica se controla con densidad, no con ornamento.

**Key Characteristics:**
- Campos de color saturado que ocupan regiones enteras; el color no es un acento
- Filete dorado de 1px como único ornamento, más el sello
- Ángulo recto: radio 2px en todo; los únicos círculos son el sello y las insignias
- Cero sombras — la profundidad viene del borde cosido y de capas tonales
- Los temas se distinguen por ícono y etiqueta, nunca por color
- Movimiento de tela: se ata, se despliega, se sella

## Colors

Paleta de estandarte: tela teñida en índigo profundo, tintas de bandera para los datos, lienzo sin
blanquear para leer, y un solo hilo de oro.

### Primary
- **Índigo Campo** (`#17264A`): el campo. Fondo de pantallas completas, de la cabecera de cada
  estandarte, y de la barra fija de acción. Es la superficie por defecto de la app del ciudadano.
- **Índigo Nocturno** (`#0D1730`): la capa más profunda. Shell, navegación, barra de estado, y el
  fondo del panel del diputado. Se usa para meter una superficie *debajo* de otra sin sombra.

### Secondary
- **Oro Filete** (`#C89A3C`): un hilo, nunca una masa. Filete de 1px en el borde de los campos, el
  anillo del sello, y el aro de foco del teclado. Si aparece como relleno de un área, está mal usado.

### Tertiary
Tintas de postura. Existen **solo para datos** (campo dividido, etiqueta de postura, contador).
Nunca son fondo de una superficie.
- **Verde Bandera** (`#1E6B45`): a favor.
- **Cochinilla** (`#A82418`): en contra.
- **Gris Pizarra** (`#77808F`): neutro, y también el estado "pendiente de análisis".

### Neutral
- **Lienzo** (`#EFEBE2`): el panel de lectura. Todo texto de más de una línea vive acá — el resumen
  en criollo, la transcripción de un sapucai, la respuesta del diputado, los campos de formulario.
- **Lienzo Hueso** (`#F7F5F0`): variante para anidar un panel dentro de otro panel.
- **Tinta** (`#14181F`): el texto sobre lienzo. Nunca negro puro.
- **Tinta Tenue** (`#5A6472`): texto secundario y metadatos sobre lienzo.
- **Hilo** (`#D6CFC0`): las divisiones y bordes dentro del lienzo. 1px, nunca más.
- **Blanco Cosido** (`#FBFAF7`): el texto sobre campo índigo.

### Named Rules

**La Regla del Filete.** El oro es un hilo de 1px, el anillo del sello y el aro de foco. Jamás un
relleno, un fondo, un botón ni un degradado. Si tapás el oro con el pulgar y la pantalla se cae, el
oro estaba haciendo un trabajo que no le corresponde.

**La Regla de la Postura.** Verde Bandera, Cochinilla y Gris Pizarra aparecen únicamente en datos:
el campo dividido, la etiqueta de una postura, un contador. Nunca como fondo de una tarjeta, un
botón o una pantalla. Un error en rojo usa Cochinilla como texto y borde, no como fondo.

**La Regla del Lienzo.** Ningún párrafo se lee sobre el campo índigo. Texto de más de una línea
exige un panel de Lienzo. Sobre el campo solo van títulos, etiquetas cortas y números.

**La Regla de la Insignia.** Los temas de interés se distinguen por **ícono y etiqueta**, nunca por
color. No hay paleta de categorías. Un carrusel de colores por tema rompe el sistema y además hace
imposible el estado seleccionado.

## Typography

**Display Font:** Archivo (variable, ejes de peso y ancho) — con `system-ui, sans-serif` de respaldo
**Body Font:** Libre Franklin (variable) — con `system-ui, sans-serif` de respaldo

**Character:** Archivo condensada en mayúsculas con tracking abierto es letra de estandarte pintado:
alta, angosta, cargada de autoridad, la que se lee de lejos. Libre Franklin abajo es una workhorse
humanista que aguanta un párrafo denso en una pantalla chica al sol sin llamar la atención sobre sí
misma. La tensión entre las dos es el sistema: arriba se proclama, abajo se explica.

### Hierarchy
- **Display** (Archivo 700, `wdth` 75, `clamp(2rem, 9vw, 3.5rem)`, line-height 0.95, tracking
  `0.04em`, MAYÚSCULAS): el nombre de la propuesta en su estandarte, y el título de las pantallas
  de onboarding. Uno por pantalla.
- **Headline** (Archivo 600, `wdth` 85, 1.5rem, line-height 1.1, tracking `0.02em`): títulos de
  sección y el título de un estandarte en el listado del feed.
- **Title** (Libre Franklin 600, 1.0625rem, line-height 1.35): títulos dentro de un panel de lienzo,
  nombre del diputado, encabezado de un sapucai.
- **Body** (Libre Franklin 400, 1rem, line-height 1.6, máximo 68ch): el resumen en criollo, las
  transcripciones, la respuesta del diputado. Nunca baja de 16px en el ciudadano — abajo de eso iOS
  hace zoom solo en los inputs y el texto no se lee al sol.
- **Label** (Archivo 600, 0.6875rem, tracking `0.14em`, MAYÚSCULAS): insignias, etiquetas de
  postura, estados, encabezados de tabla del backoffice.
- **Data** (Libre Franklin 600, `font-variant-numeric: tabular-nums`): todo número que cambie o que
  se compare en columna — porcentajes del termómetro, cantidad de sapucais, contadores.

### Named Rules

**La Regla del Único Grito.** Un solo bloque en Display por pantalla. Dos títulos gritando compiten
y ninguno se escucha. Todo lo demás baja a Headline o Title.

**La Regla de los 16.** El cuerpo de texto del ciudadano nunca baja de 16px, y ninguna etiqueta baja
de 11px. Se usa al sol, en movimiento, por gente que no tiene por qué tener buena vista.

## Layout

Mobile-first en una columna, con el pulgar como única herramienta. Contenedor del ciudadano: ancho
completo hasta 480px, y de ahí para arriba una columna centrada de 420px sobre campo índigo — el
escritorio es un mobile centrado, no un layout aparte. **Excepción: el panel del diputado**, que es
una grilla de 12 columnas con contenedor de 1280px y se diseña para monitor.

Ritmo de espaciado en múltiplos de 4, con la escala usada de verdad: `4, 8, 12, 16, 24, 32, 48, 64`.
Padding interno de un panel de lienzo: 16px en mobile, 24px en escritorio. Separación entre
estandartes del feed: 12px. Más aire arriba de un título que abajo, siempre.

La barra de acción del ciudadano es **fija al fondo**, con `env(safe-area-inset-bottom)`, altura de
72px, y ninguna otra cosa compite con ella por el pulgar. Todo objetivo táctil mide 44px como mínimo.

Breakpoints: `sm 480px`, `md 768px`, `lg 1024px`, `xl 1280px`.

## Elevation & Depth

**Este sistema no usa sombras.** Ni una. La profundidad viene de tres cosas físicas del estandarte:

1. **Capa tonal.** Índigo Nocturno queda *debajo* de Índigo Campo, que queda debajo de Lienzo.
   Tres niveles, y no hay un cuarto.
2. **El borde cosido.** Un panel de lienzo apoyado sobre el campo lleva una barra vertical de 3px de
   Índigo Campo en su borde izquierdo: el lado por donde está atado. Eso lo despega, no una sombra.
3. **El filete.** Un hilo de 1px de Oro Filete en el borde de un campo marca dónde termina la tela.

### Named Rules

**La Regla Sin Sombra.** `box-shadow` está prohibido en superficies. La única excepción es una línea
dura sin blur (`0 -1px 0`) para separar la barra fija de acción del contenido que scrollea debajo, y
el aro de foco.

**La Regla de las Tres Capas.** Nocturno → Campo → Lienzo. Si necesitás un cuarto nivel de
profundidad, el layout está mal, no falta un token.

## Shapes

Ángulo recto. Radio de 2px en estandartes, paneles, botones, inputs e insignias rectangulares — lo
justo para que no se vea como un `<table>` de 1998, y nada más. Las banderas no tienen esquinas
redondeadas.

Los **únicos círculos del sistema** son el sello (48px en el feed, 72px en el detalle) y las
insignias de tema (40px). Nada más es un círculo, y nada es una pastilla.

Silueta recurrente: **la banda de izada**. Todo estandarte lleva arriba una banda horizontal de 8px
en Índigo Nocturno con dos puntos de ojal de 3px separados 24px del borde izquierdo. Es la firma del
sistema y es lo que hace reconocible una tarjeta de Sapucái con todo el contenido borrado.

## Do's and Don'ts

### Do:
- **Do** dejar que el campo índigo ocupe la pantalla entera. La estrategia es Committed: el color
  carga entre el 30% y el 60% de la superficie.
- **Do** poner todo párrafo dentro de un panel de Lienzo con su borde cosido de 3px a la izquierda.
- **Do** usar la banda de izada de 8px con sus dos ojales en todo estandarte, sin excepción.
- **Do** dibujar el termómetro como un campo dividido: una sola barra continua de 12px de alto,
  dividida en tres partes con las tintas de postura y separadas por 1px de Hilo, con los porcentajes
  en Data debajo. Sin leyenda flotante, sin dona, sin gradiente.
- **Do** darle al sello su momento: es el único objeto del sistema con movimiento propio de llegada.
- **Do** diseñar el estado vacío, el cargando y el error de cada pantalla junto con el estado con
  datos. Son tres pantallas, no una.
- **Do** mostrar siempre la transcripción de un sapucai. El audio nunca es el único portador.
- **Do** respetar `prefers-reduced-motion`: sin despliegue ni caída de sello, solo un fundido.

### Don't:
- **Don't** usar `box-shadow` en una superficie. Ver la Regla Sin Sombra.
- **Don't** rellenar nada con Oro Filete.
- **Don't** usar Cochinilla, Verde Bandera o Gris Pizarra como fondo de una superficie.
- **Don't** asignarle un color a un tema de interés.
- **Don't** poner un párrafo sobre el campo índigo.
- **Don't** redondear más de 2px, ni usar pastillas, ni poner un segundo círculo en el sistema.
- **Don't** meter dos bloques en Display en una misma pantalla.
- **Don't** dejar el gradiente, el glass ni el ícono genérico de librería donde va un objeto
  dibujado en la gramática del estandarte (la insignia, el sello, el ojal, la cinta).
- **Don't** presentar dato mock como si fuera real: todo número visible durante el desarrollo del
  front lleva su marca de dato de demostración donde un observador podría confundirlo.
