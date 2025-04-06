import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/cabin-supabase";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin,
  });
  return { isLoading, cabins, error };
}
