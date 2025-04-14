import { useSearchParams } from "react-router-dom";

function SortBy({ options, sortField = "sortBy" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get(sortField) || "";

  function handleChange(e) {
    searchParams.set(sortField, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <select value={currentSort} onChange={handleChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default SortBy;
