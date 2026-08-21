"use client";

import { useEmployees } from "@/context/EmployeeContext";

function getPageNumbers(current: number, total: number) {
  const start = Math.max(1, Math.min(current - 2, total - 4));
  const end = Math.min(total, start + 4);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export function Pagination() {
  const { page, setPage, totalPages, filteredEmployees, pageSize } = useEmployees();
  const firstResult = filteredEmployees.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastResult = Math.min(page * pageSize, filteredEmployees.length);

  return (
    <nav className="pagination" aria-label="Employee table pagination">
      <p>
        Showing <strong>{firstResult}–{lastResult}</strong> of{" "}
        <strong>{filteredEmployees.length.toLocaleString()}</strong>
      </p>
      <div className="pagination__buttons">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        {getPageNumbers(page, totalPages).map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === page ? "is-active" : ""}
            onClick={() => setPage(pageNumber)}
            aria-current={pageNumber === page ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </nav>
  );
}
