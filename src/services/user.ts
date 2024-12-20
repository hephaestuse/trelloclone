import { supabase } from "./supabase";

export async function getUserProfile(userId: string | null) {
  const { data, error } = await supabase
    .from("userProfile")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) throw new Error(error.message);
  return data;
}
