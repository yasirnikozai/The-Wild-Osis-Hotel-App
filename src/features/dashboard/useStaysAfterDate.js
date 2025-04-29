// hooks/useStaysAfterDate.js
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useStaysAfterDate() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    data: stays,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
    // Adding stale time, so data is not refetched every time unnecessarily
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const confirmedStays =
    stays?.filter(
      (stay) => stay?.status === "checked-in" || stay?.status === "checked-out"
    ) || [];

  // Enhance error handling if needed
  if (error) {
    console.error("Error fetching stays:", error);
  }

  return { stays, confirmedStays, isLoading, error };
}
