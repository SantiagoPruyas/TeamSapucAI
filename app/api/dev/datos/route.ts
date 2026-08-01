import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Uso de la service role justificado: esta ruta dev necesita leer conteos de todas las
// tablas sin depender de qué usuario esté logueado en el navegador. Nunca se expone en producción.
const TABLAS = [
  'interests',
  'departamentos',
  'profiles',
  'user_interests',
  'proposals',
  'proposal_interests',
  'sapucais',
  'responses',
  'notifications',
] as const

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('No encontrado', { status: 404 })
  }

  const admin = createAdminClient()

  const conteos: Record<string, number | string> = {}
  for (const tabla of TABLAS) {
    const { count, error } = await admin.from(tabla).select('*', { count: 'exact', head: true })
    conteos[tabla] = error ? error.message : (count ?? 0)
  }

  const { data: propuestaEjemplo, error: errorPropuesta } = await admin
    .from('proposals')
    .select('id, titulo, estado, proposal_interests(interest_id, interests(slug, nombre))')
    .eq('estado', 'publicada')
    .limit(1)
    .maybeSingle()

  return NextResponse.json({
    conteos,
    propuestaEjemplo: errorPropuesta ? { error: errorPropuesta.message } : propuestaEjemplo,
  })
}
