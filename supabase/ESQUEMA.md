# Esquema de la Base de Datos

## Tablas

### `interests`
- `id` (UUID, primary key)
- `name` (text)

### `departamentos`
- `id` (UUID, primary key)
- `name` (text)

### `profiles`
- `id` (UUID, primary key)
- `rol` (text)
- `nombre` (text)

### `user_interests`
- `user_id` (UUID)
- `interest_id` (UUID)

### `proposals`
- `id` (UUID, primary key)
- `title` (text)
- `text` (text)
- `estado` (text)
- `publicada_at` (timestamptz)

### `proposal_interests`
- `proposal_id` (UUID)
- `interest_id` (UUID)

### `sapucais`
- `id` (UUID, primary key)
- `proposal_id` (UUID)
- `user_id` (UUID)
- `audio_url` (text)
- `texto` (text)
- `estado_procesamiento` (text)
- `moderacion_ok` (boolean)
- `moderacion_motivo` (text)
- `moderado_por` (UUID)
- `moderado_at` (timestamptz)

### `responses`
- `id` (UUID, primary key)
- `proposal_id` (UUID)
- `text` (text)

### `notifications`
- `id` (UUID, primary key)
- `user_id` (UUID)
- `tipo` (text)
- `leida` (boolean)

## Políticas de RLS

### `interests`
- Todos pueden leer, nadie puede escribir.

### `departamentos`
- Todos pueden leer, nadie puede escribir.

### `profiles`
- Solo el propietario puede leer y escribir en su propia fila.
- El backoffice puede leer todas las filas.

### `user_interests`
- Solo el propietario puede leer y escribir en su propia fila.

### `proposals`
- Solo las propuestas publicadas pueden ser leídas por todos.
- El backoffice puede leer todas las filas.

### `proposal_interests`
- Igual que `proposals`.

### `sapucais`
- El propietario puede leer y escribir su propio sapucai.
- Los sapucais de otros usuarios solo pueden ser leídos a través de la función `propuesta_stats()`.
- El backoffice puede leer todas las filas.

### `responses`
- Todos los usuarios logueados pueden leer.
- Solo el diputado puede escribir.

### `notifications`
- Solo el propietario de la notificación puede leer.
- Nadie puede escribir desde el cliente (solo funciones `security definer` y la service role).