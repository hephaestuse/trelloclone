import { supabase } from "./supabase";

export async function getBoards(userId: string | null) {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .eq("owner_id", userId);
  if (error) throw new Error(error.message);    
  return data;
}
export async function getBoardData(boardId: string | undefined) {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .eq("board_id", boardId)
    .single();
  if (error) throw new Error(error.message);
  return data;
}
