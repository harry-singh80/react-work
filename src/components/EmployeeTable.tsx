"use client";

import { useEmployees } from "@/context/EmployeeContext";
import type { EmployeeStatus } from "@/data/employees";
import { Pagination } from "./Pagination";

const statusClass: Record<EmployeeStatus, string> = {
  Active: "status status--active",
  Remote: "status status--remote",
  "On leave": "status status--leave",
};

export function EmployeeTable() {
  const { pageEmployees, filteredEmployees } = useEmployees();

  return (
    <section className="data-card" aria-labelledby="employee-table-title">
      <div className="data-card__heading">
        <div>
          <span className="eyebrow">Pagination demo</span>
          <h2 id="employee-table-title">Employee directory</h2>
        </div>
        <span className="result-count">{filteredEmployees.length.toLocaleString()} matches</span>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Department</th>
              <th>Location</th>
              <th>Status</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {pageEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <div className="person">
                    <span className="avatar" aria-hidden="true">
                      {employee.name.split(" ").map((part) => part[0]).join("")}
                    </span>
                    <span>
                      <strong>{employee.name}</strong>
                      <small>{employee.email}</small>
                    </span>
                  </div>
                </td>
                <td>{employee.role}</td>
                <td>{employee.department}</td>
                <td>{employee.location}</td>
                <td><span className={statusClass[employee.status]}>{employee.status}</span></td>
                <td><span className="score">{employee.performance}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {pageEmployees.length === 0 && (
          <div className="empty-state">
            <strong>No employees found</strong>
            <span>Try a different search term or clear the filters.</span>
          </div>
        )}
      </div>

      <Pagination />
    </section>
  );
}
