import { supabase } from "./supabase";

export async function getJobs(colId: string | undefined) {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("column_id", colId);
  if (error) throw new Error(error.message);
  
  return data;
}