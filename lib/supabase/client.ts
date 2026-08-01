import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

// Para componentes cliente ('use client'). Usa la anon key: respeta la RLS.
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
