import { useQuery } from "@tanstack/react-query";
import { fetchSession } from "../../services/auth";

export const useSession = () => {
  return useQuery({ queryKey: ["session"], queryFn: fetchSession });
};
