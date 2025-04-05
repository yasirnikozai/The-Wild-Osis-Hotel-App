import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lehlgefwsrctakoqqyks.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGxnZWZ3c3JjdGFrb3FxeWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMjIzMDIsImV4cCI6MjA1ODU5ODMwMn0.5xzfIWEhR5lquRgaf7T1eSPgXFw3Qba9cYkGSx5uRQI";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
