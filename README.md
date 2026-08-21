# React Data Explorer

![React Data Explorer social preview](public/og.jpg)

A clear, portfolio-ready React project that demonstrates how to work with a large
static dataset while keeping the interface fast and the code easy to understand.

## Concepts demonstrated

- **Context API:** search, department filters, page size, current page, and view
  mode are shared without prop drilling.
- **Reusable components:** stat cards, concept cards, toolbar controls, pagination,
  and data views have focused responsibilities and typed props.
- **Pagination:** the filtered array is split into small pages before rendering.
- **List virtualization:** a custom hook calculates the visible range, so React
  renders roughly 15 rows instead of mounting all 1,500.
- **Derived state:** totals and filtered results are calculated from source data
  instead of being duplicated in state.
- **Responsive UI:** the dashboard adapts to desktop, tablet, and mobile layouts.

## Try the demo

1. Search for a name, role, or location.
2. Filter by department.
3. Change the number of rows shown per page.
4. Switch between **Pagination** and **Virtualized list**.
5. Scroll quickly in virtualization mode and watch the rendered-row count.

## Project structure

```text
src/
  App.tsx                         Provider setup and app entry
  components/
    Dashboard.tsx                 Page composition
    EmployeeTable.tsx             Paginated table view
    VirtualizedList.tsx           Virtualized rendering view
    Pagination.tsx                Reusable page controls
    StatCard.tsx                  Reusable typed card
  context/
    EmployeeContext.tsx           Shared state and derived data
  data/
    employees.ts                  1,500 deterministic static records
  hooks/
    useVirtualList.ts             Custom virtualization calculations
```

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Then open the local URL printed in the terminal.

## Production build

```bash
npm run build
```

## Tech stack

React 19, TypeScript, Vite, and modern CSS. The project uses no backend,
database, UI framework, or external data API—the focus stays on core React ideas.
