import { createClient } from '@supabase/supabase-js';

// Pull from process.env, not import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseServiceRoleKey = import.meta.env.VITE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);
