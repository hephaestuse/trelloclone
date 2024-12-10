import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://huqcuwgqbbzjbtxqlyio.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1cWN1d2dxYmJ6amJ0eHFseWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjI2NTUsImV4cCI6MjA0OTMzODY1NX0.XyiBoB12tF3yaU5FVnQg96oExqHTWELPspSVOW-hWGM";
export const supabase = createClient(supabaseUrl, supabaseKey);
