import { supabase } from "./supabase";

type TloginUser = { email: string; password: string };
export const loginUser = async ({ email, password }: TloginUser) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
};

export const fetchSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  return data.session;
};
