import { supabase } from "./supabase";

export async function getCols(boardId: string | undefined) {
  const { data, error } = await supabase
    .from("columns")
    .select("*")
    .eq("board_id", boardId);
  if (error) throw new Error(error.message);

  return data;
}
export async function addCol(postData: object) {
  const { data, error } = await supabase
    .from("columns")
    .insert([postData])
    .select();

  if (error) throw new Error(error.message);

  return data;
}
