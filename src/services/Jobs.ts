import { supabase } from "./supabase";

export async function getJobs(colId: string | undefined) {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("column_id", colId);
  if (error) throw new Error(error.message);
  return data;
}
export async function postJobs(postData: object) {
  const { data, error } = await supabase
    .from("cards")
    .insert([postData])
    .select();

  if (error) throw new Error(error.message);

  return data;
}
export async function updateJobs({
  updateData,
  card_id,
}: {
  updateData: object;
  card_id: string;
}) {
  const { data, error } = await supabase
    .from("cards")
    .update(updateData)
    .eq("card_id", card_id)
    .select();

  console.log(data);

  if (error) throw new Error(error.message);

  return data;
}
interface Update {
  card_id: string;
  position: number;
}

export const batchJobUpdate = async (updates: Update[]) => {
  const updatePromises = updates.map(async (update: Update) => {
    const { data, error } = await supabase
      .from("cards")
      .update({ position: update.position })
      .eq("card_id", update.card_id);

    if (error)
      throw new Error(
        `Error updating record with card_id ${update.card_id}: ${error.message}`
      );
    return data;
  });

  return await Promise.all(updatePromises);
};
