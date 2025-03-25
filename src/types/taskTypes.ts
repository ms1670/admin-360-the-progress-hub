export interface Task {
    id: number;
    title: string;
    name: string;
    department: string;
    status: "New" | "Pending" | "In Progress" | "Completed";
    dueDate: string;
    attachment?: string;
    createdAt: string; // ✅ Added for tracking time
  }
  

// export interface Task {
//     id: number;
//     title: string;
//     name: string;
//     department: string;
//     status: string;
//     dueDate: string; // ✅ This should be present
//     attachment?: string;
//   }