import React from "react";
import Stat from "./Stat";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  const numBookings = bookings?.length || 0; // If bookings is undefined, default to 0
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0) || 0; // Default to 0 if bookings is undefined
  const checkIns = confirmedStays?.length || 0; // If confirmedStays is undefined, default to 0
  const occupacy = confirmedStays?.reduce(
    acc,
    (cur) => acc + cur.numNights,
    (0 / numDays) * cabinCount
  );
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={sales}
      />
      <Stat
        title="Check Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupacy"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={numBookings}
      />
    </>
  );
}
