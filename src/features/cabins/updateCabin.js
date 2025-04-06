import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin } from "../../services/cabin-supabase";
export default function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: isUpdatingCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabindata, id }) => addCabin(newCabindata, id),
    onSuccess: () => {
      toast.success("New cabin has been Updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdatingCabin, isUpdating };
}
