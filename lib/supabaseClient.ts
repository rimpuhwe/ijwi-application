"use client";

import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Warn clearly in dev if missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Missing Supabase environment variables.");
}

/**
 * Create a single Supabase client for the browser.
 * This automatically:
 *  - Persists session in localStorage
 *  - Refreshes tokens automatically
 *  - Attaches session to all queries
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // enables redirect-based login flows too
    storageKey: "supabase.auth.token", // helps avoid key conflicts
  },
});

export default supabase;
