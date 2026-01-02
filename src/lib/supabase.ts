import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) {
    return supabaseInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables not set:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      url: supabaseUrl,
      keyLength: supabaseAnonKey?.length
    })
    return null
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    return supabaseInstance
  } catch (error) {
    console.error('Failed to initialize Supabase:', error)
    return null
  }
}
