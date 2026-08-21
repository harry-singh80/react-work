import { Dashboard } from "@/components/Dashboard";
import { EmployeeProvider } from "@/context/EmployeeContext";

export default function App() {
  return (
    <EmployeeProvider>
      <Dashboard />
    </EmployeeProvider>
  );
}
