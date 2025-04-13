// src/pages/BookingTable.jsx
import styled from "styled-components";
import BookingRow from "../bookings/BookingRow";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

const COLUMNS = "1.5fr 2fr 2.5fr 1.5fr 1fr 1fr"; // Same layout for all rows & header

function BookingTable() {
  const { isLoading, bookings, error } = useBookings();
  console.log(bookings);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading bookings: {error.message}</p>;
  if (!bookings || bookings.length === 0) return <Empty resource="bookings" />;

  return (
    <Table>
      <Table.Header columns={COLUMNS}>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />
    </Table>
  );
}

export default BookingTable;
