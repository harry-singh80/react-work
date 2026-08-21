"use client";

import { useEmployees } from "@/context/EmployeeContext";

export function Toolbar() {
  const {
    search,
    setSearch,
    department,
    setDepartment,
    departments,
    pageSize,
    setPageSize,
    clearFilters,
  } = useEmployees();

  const hasFilters = search.length > 0 || department !== "All departments";

  return (
    <div className="toolbar">
      <label className="field field--search">
        <span className="field__label">Search people</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Name, role, location..."
          type="search"
        />
      </label>

      <label className="field">
        <span className="field__label">Department</span>
        <select value={department} onChange={(event) => setDepartment(event.target.value)}>
          <option>All departments</option>
          {departments.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>

      <label className="field field--small">
        <span className="field__label">Rows</span>
        <select
          value={pageSize}
          onChange={(event) => setPageSize(Number(event.target.value))}
          aria-describedby="rows-help"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <span id="rows-help" className="sr-only">Only used by pagination mode</span>
      </label>

      <button className="button button--quiet" onClick={clearFilters} disabled={!hasFilters}>
        Clear filters
      </button>
    </div>
  );
}
