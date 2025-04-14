import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingAll } from "../../services/apiBookings";

const PAGE_SIZE = 10;

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const statusValue = searchParams.get("status");
  const sortByValue = searchParams.get("sortBy");
  const pageValue = searchParams.get("page");

  const filter =
    !statusValue || statusValue === "all"
      ? null
      : { field: "status", value: statusValue };

  const page = pageValue ? Number(pageValue) : 1;

  const queryKey = ["bookings", filter, sortByValue, page];

  const { isLoading, data, error } = useQuery({
    queryKey,
    queryFn: () =>
      getBookingAll({ filter, sortBy: sortByValue, page, pageSize: PAGE_SIZE }),
    keepPreviousData: true,
  });

  // Prefetch the next page (if any)
  if (data?.count && page < Math.ceil(data.count / PAGE_SIZE)) {
    const nextPage = page + 1;
    const nextQueryKey = ["bookings", filter, sortByValue, nextPage];
    queryClient.prefetchQuery({
      queryKey: nextQueryKey,
      queryFn: () =>
        getBookingAll({
          filter,
          sortBy: sortByValue,
          page: nextPage,
          pageSize: PAGE_SIZE,
        }),
    });
  }

  return {
    isLoading,
    bookings: data?.data,
    count: data?.count,
    error,
  };
}
