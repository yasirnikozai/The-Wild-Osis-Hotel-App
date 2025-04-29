import React from "react";
import styled from "styled-components";
import { useBookingsAfterDate } from "./useBookingsAfterDate";
import { useStaysAfterDate } from "./useStaysAfterDate";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";

// Styled Component
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

// Main Dashboard Component
export default function DashboardLayout() {
  // 🛒 Fetch bookings data
  const { bookingAfterDate, isLoading: isLoadingBookings } =
    useBookingsAfterDate();

  // 🏨 Fetch stays data
  const {
    stays,
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useStaysAfterDate();

  // 🏕️ Fetch cabins data
  const { isLoading: isLoadingCabins, cabins, error } = useCabins();

  // 🚀 Correct loading check
  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookingAfterDate}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <div>Today's Activity</div>
      <div>Chart Sales</div>
      <div>Chart Stays Duration</div>
    </StyledDashboardLayout>
  );
}
