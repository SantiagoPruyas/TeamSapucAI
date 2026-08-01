# S1D — Esquema, migraciones y seed

**Ejecutada por Santi**, cubriendo el carril DATOS: a Agos se le rompió la compu y no pudo
seguir. Se ejecuta en su nombre, sobre su rama (`feat/datos/esquema`), siguiendo exactamente
lo que el plan describe para S1D. Cuando Agos vuelva a tener máquina, que revise este commit
como si fuera su propio trabajo — es la revisión cruzada de VB-8 pendiente.

## Qué se hizo

- Merge puntual de `lib/types.ts` y `lib/mock/**` desde `origin/front` (necesarios para que
  `lib/data/_contrato.ts` y los tipos de la app compilen). Anotado en §13/§14 de PLAN-BACK.md.
- Migraciones `0001` a `0006` (catálogos, perfiles + trigger de alta, propuestas, sapucais,
  respuestas/notificaciones, las tres funciones `security definer`).
- `supabase/seed.sql`: 25 departamentos reales de Corrientes, 10 intereses del catálogo cerrado,
  20 propuestas (con los casos límite: título de 140 caracteres exacto, una publicada con 0
  sapucais, una `procesando` con `resumen_ia = null`), 16 perfiles (2 ciudadanos "nombrados" A/B
  para las pruebas de RLS por pares de S2D + 12 ciudadanos de relleno con nombres inventados +
  equipo de cámara + diputado) y 62 sapucais repartidos.
- `lib/supabase/{client,server,admin}.ts`, `lib/supabase/database.types.ts` (generado con
  `supabase gen types typescript --local`, no a mano — se regenera en cada migración futura).
- `lib/data/_contrato.ts` (esqueleto; se completa desde S2D).
- `app/api/dev/datos/route.ts`.

## Desvío del plan y por qué

El plan preveía ~40 sapucais usando solo los usuarios A y B. Con la restricción
`unique(proposal_id, user_id)` (una persona, una voz por propuesta — regla de negocio del
propio plan, S4D), eso limita cualquier propuesta a 2 opiniones como máximo. Se agregaron 12
ciudadanos de relleno para que el seed sea realista y sirva para probar `propuesta_stats()`
con volumen de verdad. Ningún nombre es real.

## Verificación (VB)

- **VB-0/VB-1 equivalente:** no hay Supabase Cloud todavía (README ya no tiene credenciales
  reales, PROJECT.md decía que venían commiteadas por error y se sacaron en S0I). Se usó
  **Supabase local vía CLI + Docker** (`supabase start`, `supabase db reset`) como banco de
  pruebas, que es exactamente lo que exige la DoD de portabilidad: *"las migraciones corren de
  cero en una base vacía sin un solo error"*.
- Confirmado: `supabase db reset` corre las 6 migraciones y el seed de punta a punta sin error,
  dos veces (una con el bug del `unique` sin resolver, otra ya corregido).
- Conteos verificados por SQL directo: 25 departamentos, 10 intereses, 16 profiles, 20
  proposals, 38 proposal_interests, 62 sapucais, 1 response.
- `propuesta_stats()` probado contra la primera propuesta publicada: devuelve
  `{a_favor, en_contra, neutro, pendientes}` coherente con los datos insertados.
- `pnpm tsc --noEmit` limpio (VB-6), incluido `lib/data/_contrato.ts`.
- **RLS: todavía deshabilitada en las 9 tablas.** Es lo esperado — S2D es la sesión que la
  habilita y escribe las políticas (§10 de PLAN-BACK.md). El propio advisor de la CLI lo marca
  como crítico; se documenta acá para que quede explícito que no se saltó por accidente.

## Pendiente (VB-8, honesto)

- **No se corrió `agent-browser` ni se sacaron capturas de Supabase Studio.** No hay proyecto
  cloud linkeado todavía (falta que alguien del equipo cree el proyecto real en Supabase y
  comparta las keys, según S0D paso 1) — sobre el stack local sí se verificó todo por SQL
  directo, que es equivalente en contenido pero no en captura de pantalla.
- **Revisión cruzada de Agos:** no puede hacerla hasta que tenga máquina de nuevo. Queda
  anotado en §13 de PLAN-BACK.md como sesión cerrada por Santi, pendiente de revisión.
- VB-7 (RLS con dos usuarios) no aplica todavía: RLS no está habilitada hasta S2D.
