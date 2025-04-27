import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/APIauth";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success("User is successfully updated");
            queryClient.setQueryData(["user"], user);
        },
        onError: (error) => toast.error(error.message), // ✅ fixed this line
    });

    return { updateUser, isLoading };
}