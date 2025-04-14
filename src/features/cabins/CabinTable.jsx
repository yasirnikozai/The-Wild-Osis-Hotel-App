import React from "react";
import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortby") || "name-asc";

  if (isLoading) return <Spinner />;

  // 1. FILTER
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  // 2. SORT
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (typeof aVal === "string") {
      return aVal.localeCompare(bVal) * modifier;
    }
    return (aVal - bVal) * modifier;
  });

  // 3. RENDER
  const columns = "0.6fr 1.8fr 2.2fr 1fr 1fr 1fr";

  return (
    <Table>
      <Table.Header columns={columns}>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
      <Table.Footer>
        <Pagination />
      </Table.Footer>
    </Table>
  );
}
