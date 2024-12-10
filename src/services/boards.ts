import { supabase } from "./supabase";

export async function getBoards(userId: string | null) {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .eq("owner_id", userId);
  if (error) throw new Error(error.message);
  return data;
}
