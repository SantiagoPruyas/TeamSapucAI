// Este archivo no se importa desde ningún lado. Su único trabajo es romper la compilación
// si una función real deja de calzar con lo que el front espera.
// Una línea por función. Si la firma cambia, esto no compila. Nadie cierra una sesión
// sin agregar las suyas (§5.4 de PLAN-BACK.md).

type Fn<A extends unknown[], R> = (...a: A) => Promise<R>

// Se completa a partir de S2D (getPerfil, getIntereses, getDepartamentos) y S3D (el resto
// de lib/data/citizen.ts), S4D/S5D (lib/data/backoffice.ts), S3I (analizarBorrador/publicarPropuesta).
export const _pendiente: Fn<[], void> = async () => {}

void [_pendiente]
