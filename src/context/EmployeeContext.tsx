"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { departmentOptions, employees, type Employee } from "@/data/employees";

type EmployeeContextValue = {
  allEmployees: Employee[];
  filteredEmployees: Employee[];
  pageEmployees: Employee[];
  departments: string[];
  search: string;
  department: string;
  page: number;
  pageSize: number;
  totalPages: number;
  viewMode: "pagination" | "virtualization";
  setSearch: (value: string) => void;
  setDepartment: (value: string) => void;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  setViewMode: (value: "pagination" | "virtualization") => void;
  clearFilters: () => void;
};

const EmployeeContext = createContext<EmployeeContextValue | null>(null);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [search, updateSearch] = useState("");
  const [department, updateDepartment] = useState("All departments");
  const [page, updatePage] = useState(1);
  const [pageSize, updatePageSize] = useState(10);
  const [viewMode, setViewMode] = useState<"pagination" | "virtualization">("pagination");

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesDepartment =
        department === "All departments" || employee.department === department;
      const matchesSearch =
        !query ||
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query) ||
        employee.location.toLowerCase().includes(query);

      return matchesDepartment && matchesSearch;
    });
  }, [department, search]);

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const pageEmployees = filteredEmployees.slice(startIndex, startIndex + pageSize);

  const value = useMemo<EmployeeContextValue>(
    () => ({
      allEmployees: employees,
      filteredEmployees,
      pageEmployees,
      departments: departmentOptions,
      search,
      department,
      page: safePage,
      pageSize,
      totalPages,
      viewMode,
      setSearch: (value) => {
        updateSearch(value);
        updatePage(1);
      },
      setDepartment: (value) => {
        updateDepartment(value);
        updatePage(1);
      },
      setPage: updatePage,
      setPageSize: (value) => {
        updatePageSize(value);
        updatePage(1);
      },
      setViewMode,
      clearFilters: () => {
        updateSearch("");
        updateDepartment("All departments");
        updatePage(1);
      },
    }),
    [department, filteredEmployees, pageEmployees, safePage, pageSize, search, totalPages, viewMode],
  );

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
}

export function useEmployees() {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error("useEmployees must be used inside EmployeeProvider");
  }

  return context;
}
