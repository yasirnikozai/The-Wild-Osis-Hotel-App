import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin } from "../../services/cabin-supabase";

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: isCreatingCabin, isLoading: isCreating } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("New cabin has been added");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreatingCabin, isCreating };
}
