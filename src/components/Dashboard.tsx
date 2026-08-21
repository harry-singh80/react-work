"use client";

import { useEmployees } from "@/context/EmployeeContext";
import { ConceptCard } from "./ConceptCard";
import { EmployeeTable } from "./EmployeeTable";
import { StatCard } from "./StatCard";
import { Toolbar } from "./Toolbar";
import { VirtualizedList } from "./VirtualizedList";

export function Dashboard() {
  const {
    allEmployees,
    filteredEmployees,
    departments,
    viewMode,
    setViewMode,
  } = useEmployees();
  const activeCount = allEmployees.filter((employee) => employee.status === "Active").length;

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="React Data Explorer home">
          <span className="brand__mark">R</span>
          <span>React Data Explorer<small>Concept showcase</small></span>
        </a>
        <a
          className="github-link"
          href="https://github.com/harry-singh80/react-work"
          target="_blank"
          rel="noreferrer"
        >
          View source <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className="page-shell" id="top">
        <section className="hero">
          <div>
            <span className="hero__kicker">Built to explain, not just impress</span>
            <h1>Explore 1,500 records without losing the thread.</h1>
            <p>
              A focused React project showing how shared state, reusable components,
              filtering, pagination, and virtualization work together on a realistic static dataset.
            </p>
          </div>
          <div className="hero__concepts" aria-label="Concepts demonstrated">
            <span>Context API</span>
            <span>Pagination</span>
            <span>Reusable UI</span>
            <span>Virtualization</span>
          </div>
        </section>

        <section className="stats" aria-label="Dataset summary">
          <StatCard label="Total records" value={allEmployees.length.toLocaleString()} detail="Static, local dataset" tone="violet" />
          <StatCard label="Current matches" value={filteredEmployees.length.toLocaleString()} detail="Updates from shared filters" tone="blue" />
          <StatCard label="Departments" value={String(departments.length)} detail="One reusable data model" tone="orange" />
          <StatCard label="Active people" value={activeCount.toLocaleString()} detail="Derived data, no extra state" tone="green" />
        </section>

        <section className="mode-bar" aria-label="Rendering concept selector">
          <div>
            <span className="eyebrow">Compare approaches</span>
            <strong>Choose how React should render the same filtered data</strong>
          </div>
          <div className="mode-switch">
            <button
              className={viewMode === "pagination" ? "is-active" : ""}
              onClick={() => setViewMode("pagination")}
            >
              Pagination
              <small>Render one page</small>
            </button>
            <button
              className={viewMode === "virtualization" ? "is-active" : ""}
              onClick={() => setViewMode("virtualization")}
            >
              Virtualized list
              <small>Render visible rows</small>
            </button>
          </div>
        </section>

        <section className="workspace">
          <div className="workspace__main">
            <Toolbar />
            {viewMode === "pagination" ? <EmployeeTable /> : <VirtualizedList />}
          </div>

          <aside className="concept-panel">
            <div className="concept-panel__heading">
              <span className="eyebrow">Under the hood</span>
              <h2>Concept map</h2>
              <p>Each idea is isolated in a small file so the code is easy to follow.</p>
            </div>
            <ConceptCard
              number="01"
              title="Context API"
              description="Search, filters, and paging are shared without prop drilling."
              file="context/EmployeeContext.tsx"
            />
            <ConceptCard
              number="02"
              title="Reusable components"
              description="Cards and controls receive data through clear, typed props."
              file="components/StatCard.tsx"
            />
            <ConceptCard
              number="03"
              title="Pagination"
              description="Only the requested slice of the filtered array is rendered."
              file="components/Pagination.tsx"
            />
            <ConceptCard
              number="04"
              title="List virtualization"
              description="A custom hook calculates which rows are visible while scrolling."
              file="hooks/useVirtualList.ts"
            />
            <div className="tip-card">
              <span>Try it</span>
              <p>Search “backend”, switch departments, then compare both rendering modes.</p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
