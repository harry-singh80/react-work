"use client";

import { useEmployees } from "@/context/EmployeeContext";
import { useVirtualList } from "@/hooks/useVirtualList";

const ROW_HEIGHT = 72;
const CONTAINER_HEIGHT = 432;

export function VirtualizedList() {
  const { filteredEmployees } = useEmployees();
  const { startIndex, endIndex, offsetY, totalHeight, handleScroll } = useVirtualList({
    itemCount: filteredEmployees.length,
    rowHeight: ROW_HEIGHT,
    containerHeight: CONTAINER_HEIGHT,
  });
  const visibleEmployees = filteredEmployees.slice(startIndex, endIndex);

  return (
    <section className="data-card" aria-labelledby="virtual-list-title">
      <div className="data-card__heading">
        <div>
          <span className="eyebrow">Virtualization demo</span>
          <h2 id="virtual-list-title">High-performance directory</h2>
        </div>
        <span className="result-count">
          Rendering {visibleEmployees.length} of {filteredEmployees.length.toLocaleString()}
        </span>
      </div>

      <div className="virtual-head" aria-hidden="true">
        <span>Employee</span>
        <span>Team & role</span>
        <span>Location</span>
        <span>Performance</span>
      </div>

      {filteredEmployees.length > 0 ? (
        <div
          className="virtual-window"
          style={{ height: CONTAINER_HEIGHT }}
          onScroll={handleScroll}
          aria-label="Virtualized employee list"
          tabIndex={0}
        >
          <div className="virtual-space" style={{ height: totalHeight }}>
            <div
              className="virtual-items"
              style={{ transform: `translateY(${offsetY}px)` }}
            >
              {visibleEmployees.map((employee) => (
                <article
                  className="virtual-row"
                  key={employee.id}
                  style={{ height: ROW_HEIGHT }}
                >
                  <div className="person">
                    <span className="avatar" aria-hidden="true">
                      {employee.name.split(" ").map((part) => part[0]).join("")}
                    </span>
                    <span>
                      <strong>{employee.name}</strong>
                      <small>{employee.email}</small>
                    </span>
                  </div>
                  <div>
                    <strong className="virtual-row__primary">{employee.department}</strong>
                    <small className="virtual-row__secondary">{employee.role}</small>
                  </div>
                  <span>{employee.location}</span>
                  <div className="performance">
                    <span>{employee.performance}%</span>
                    <div><i style={{ width: `${employee.performance}%` }} /></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <strong>No employees found</strong>
          <span>Try a different search term or clear the filters.</span>
        </div>
      )}

      <div className="virtual-note">
        <strong>Why it is fast:</strong> the scroll area represents every row, but React only
        mounts the small visible range plus a four-row buffer.
      </div>
    </section>
  );
}
