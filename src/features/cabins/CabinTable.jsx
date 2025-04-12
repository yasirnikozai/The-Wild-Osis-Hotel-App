import React, { useState } from "react";
import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import Button from "../../ui/Button"; // Assuming you're using your custom Button
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount" || "all");
  if (isLoading) return <Spinner />;

  let filterCabin;
  if (filterValue === "all") filterCabin = cabins;
  if (filterValue === "discount")
    filterCabin = cabins.filter((cabin) => cabin.discount > 0);
  if (filterValue === "no discount")
    filterCabin = cabins.filter((cabin) => cabin.discount === 0);
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
        data={filterCabin}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}
