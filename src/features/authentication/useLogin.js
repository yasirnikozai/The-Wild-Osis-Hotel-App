import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/APIauth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useLogin() {
    const navigate = useNavigate();
    const { isLoading, mutate: createUser } = useMutation({
        mutationFn: ({ email, password }) => loginAPI({ email, password }),
        onSuccess: (user) => {
            toast.success("Sucessfully Log in");
            navigate("/dashboard");
        },
        onError: () => {
            toast.error("Provided email and password is incorrect");
        },
    });
    return { isLoading, createUser };
}