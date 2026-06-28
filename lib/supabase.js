import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create a client when both keys exist. If they are missing (e.g. a
// preview build without env vars), export null so the app keeps working
// exactly as before instead of crashing at import time.
export const supabase = url && anon ? createClient(url, anon, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
}) : null;

export const hasSupabase = !!supabase;
