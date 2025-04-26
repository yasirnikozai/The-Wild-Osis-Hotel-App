import { useMutation } from "@tanstack/react-query";
import { SignUp } from "../../services/APIauth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: SignUp,
    onSuccess: (user) =>
      toast.success(
        "New user has Sucessfully created Please verify email address"
      ),
  });
  return { signUp, isLoading };
}
