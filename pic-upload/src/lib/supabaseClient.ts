// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Use environment variables for security
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string
);