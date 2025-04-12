import { useSearchParams } from "react-router-dom";
import Select from "./Select";
export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const SortByValue = searchParams.get("sortby" || "");
  function handleChange(e) {
    searchParams.set("sortby", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
      type="white"
      value={SortByValue}
    />
  );
}
