import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Cliente con service role: IGNORA la RLS. Solo se usa desde el servidor y solo para:
//  1. el fan-out de notificaciones
//  2. el pipeline de IA que escribe transcripción, postura y moderación
// Cualquier otro uso es un bug de seguridad. Si lo importás, justificá por qué en un comentario.
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
