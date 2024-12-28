import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-my-custom-header': 'application-name'
    }
  },
  db: {
    schema: 'public'
  }
});

// Add error handling wrapper
export const handleSupabaseError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('Supabase error:', error.message);
    throw new Error(`Database error: ${error.message}`);
  }
  throw new Error('An unexpected database error occurred');
};