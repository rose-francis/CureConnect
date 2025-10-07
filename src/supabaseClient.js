import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_API } from '@env';

export const supabase = createClient(SUPABASE_URL, SUPABASE_API);
