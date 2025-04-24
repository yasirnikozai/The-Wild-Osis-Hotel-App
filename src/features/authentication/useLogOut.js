import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/APIauth"; // Rename to avoid conflict
import { useNavigate } from "react-router-dom";

export function useLogOut() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi, // use the renamed version here
        onSuccess: () => {
            queryClient.removeQueries(); // optional, clears all cached data
            navigate("/login", { replace: true });
        },
    });

    return { logout, isLoading };
}