import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingAll } from "../../services/apiBookings";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const statusValue = searchParams.get("status");
  const sortByValue = searchParams.get("sortBy");

  const filter =
    !statusValue || statusValue === "all"
      ? null
      : { field: "status", value: statusValue };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortByValue],
    queryFn: () => getBookingAll({ filter, sortBy: sortByValue }),
  });

  return { isLoading, bookings, error };
}
