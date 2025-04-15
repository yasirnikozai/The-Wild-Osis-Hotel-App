// src/pages/BookingTable.jsx
import styled from "styled-components";
import BookingRow from "../bookings/BookingRow";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Pagination from "../../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
const COLUMNS = "1.5fr 2fr 2.5fr 1.5fr 1fr 1fr";
const PAGE_SIZE = 10;

function BookingTable() {
  const { isLoading, bookings, count, error } = useBookings();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  function handlePageChange(newPage) {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  }

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading bookings: {error.message}</p>;
  if (!bookings || bookings.length === 0) return <Empty resource="bookings" />;

  return (
    <Menus>
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
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>

      <Pagination
        count={count}
        page={page}
        onPageChange={handlePageChange}
        pageSize={PAGE_SIZE}
      />
    </Menus>
  );
}

export default BookingTable;
