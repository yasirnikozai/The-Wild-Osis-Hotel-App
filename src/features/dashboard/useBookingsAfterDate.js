// hooks/useBookingsAfterDate.js
import { useQuery } from "@tanstack/react-query";
import { getBookingAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useBookingsAfterDate() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: bookingAfterDate, isLoading } = useQuery({
    queryFn: () => getBookingAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { bookingAfterDate, isLoading };
}
