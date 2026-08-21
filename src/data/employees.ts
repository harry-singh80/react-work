export type EmployeeStatus = "Active" | "Remote" | "On leave";

export type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  location: string;
  status: EmployeeStatus;
  joined: string;
  performance: number;
};

const firstNames = [
  "Aarav", "Aditi", "Arjun", "Diya", "Harsh", "Ishita", "Kabir", "Kavya", "Manav", "Meera",
  "Neha", "Nikhil", "Priya", "Rahul", "Riya", "Rohan", "Saanvi", "Siddharth", "Tanvi", "Vihaan",
];

const lastNames = [
  "Sharma", "Singh", "Patel", "Gupta", "Mehta", "Verma", "Kapoor", "Joshi", "Rao", "Malhotra",
];

const departments = [
  "Engineering", "Product", "Design", "Marketing", "Sales", "Customer Success",
];

const roles: Record<string, string[]> = {
  Engineering: ["Frontend Engineer", "Backend Engineer", "QA Engineer", "DevOps Engineer"],
  Product: ["Product Manager", "Business Analyst", "Product Owner"],
  Design: ["Product Designer", "UX Researcher", "Visual Designer"],
  Marketing: ["Content Strategist", "SEO Specialist", "Growth Manager"],
  Sales: ["Account Executive", "Sales Manager", "Solutions Consultant"],
  "Customer Success": ["Success Manager", "Support Specialist", "Implementation Lead"],
};

const locations = ["Gurugram", "Bengaluru", "Pune", "Hyderabad", "Noida", "Remote"];
const statuses: EmployeeStatus[] = ["Active", "Active", "Active", "Remote", "On leave"];

// A deterministic, locally generated dataset keeps this demo fast and API-free.
export const employees: Employee[] = Array.from({ length: 1500 }, (_, index) => {
  const id = index + 1;
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  const department = departments[index % departments.length];
  const departmentRoles = roles[department];
  const role = departmentRoles[Math.floor(index / departments.length) % departmentRoles.length];
  const year = 2018 + (index % 8);
  const month = String((index % 12) + 1).padStart(2, "0");
  const day = String((index % 27) + 1).padStart(2, "0");

  return {
    id,
    name: `${firstName} ${lastName}`,
    email: `${firstName}.${lastName}${id}@example.com`.toLowerCase(),
    role,
    department,
    location: locations[(index * 3) % locations.length],
    status: statuses[(index * 7) % statuses.length],
    joined: `${year}-${month}-${day}`,
    performance: 72 + ((index * 11) % 28),
  };
});

export const departmentOptions = departments;
