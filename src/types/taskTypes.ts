export type TaskStatus = "New" | "Pending" | "In Progress" | "Completed";

export interface Task {
  id: number;
  title: string;
  description: string;
  department: string;
  member_name: string;   // Updated from "name"
  attachment?: string;
  due_date: string;      // Updated from "dueDate"
  created_at: string;    // Updated from "createdAt"
  updated_at: string;    // Added to match the database
  status: TaskStatus;
}


// export interface Task {
//     id: number;
//     title: string;
//     name: string;
//     department: string;
//     status: "New" | "Pending" | "In Progress" | "Completed";
//     dueDate: string;
//     attachment?: string;
//     createdAt: string; // ✅ Added for tracking time
//   }


// export interface Task {
//     id: number;
//     title: string;
//     name: string;
//     department: string;
//     status: string;
//     dueDate: string; // ✅ This should be present
//     attachment?: string;
//   }