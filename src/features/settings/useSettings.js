import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useSettings() {
    const {
        isLoading,
        err,
        data: settings,
    } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });
    return { isLoading, settings, err };
}