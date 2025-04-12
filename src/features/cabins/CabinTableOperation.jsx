import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperation from "../../ui/TableOperations";
export default function CabinTableOperation() {
  return (
    <TableOperation>
      <Filter />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name (A-Z)" },
          { value: "name-desc", label: "Sort by Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (Low First)" },
          { value: "regularPrice-desc", label: "Sort by Price (High First)" },
          {
            value: "maxCapacity-asc",
            label: "Sort by Max Capacity (Low First)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by Max Capacity (High First)",
          },
        ]}
      />
    </TableOperation>
  );
}
