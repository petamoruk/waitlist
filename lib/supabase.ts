import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("Missing required env vars: SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY");
    }
    _client = createClient(url, key);
  }
  return _client;
}