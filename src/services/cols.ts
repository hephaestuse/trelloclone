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
export async function deleteCol(colId: string) {
  const { error: deleteCardsError } = await supabase
    .from("cards")
    .delete()
    .eq("column_id", colId);
  if (deleteCardsError) throw new Error(deleteCardsError.message);

  const { error } = await supabase
    .from("columns")
    .delete()
    .eq("columns_id", colId);

  if (error) throw new Error(error.message);
}
export async function updateCol(updateData: [string, object]) {
  const { data, error } = await supabase
    .from("columns")
    .update(updateData[1])
    .eq("columns_id", updateData[0])
    .select();

  if (error) throw new Error(error.message);

  return data;
}
