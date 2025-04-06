import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useEditSetting() {
    const queryClient = useQueryClient();
    const { mutate: isUpdatingSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success("Setting has been Updated");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { isUpdatingSetting, isUpdating };
}