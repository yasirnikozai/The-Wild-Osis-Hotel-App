import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      {/* We could do these two as compound components as well, but let's keep it simple, and let's also explore different ways of achieving the same thing */}
      <Filter
        filterField="status"
        options={[
          { label: "All", value: "all" },
          { label: "Checked in", value: "checked-in" },
          { label: "Checked out", value: "checked-out" },
          { label: "Unconfirmed", value: "unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
