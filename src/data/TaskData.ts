import { Task } from "../types/taskTypes"; // ✅ Ensure correct import path

export const initialTasks: Task[] = [
  { id: 1, title: "Soil Testing for Crops", name: "Aravi", department: "Agriculture", status: "Pending", dueDate: "2025-03-08", attachment: "https://example.com/file1.pdf", createdAt: "2025-03-07T08:00:00Z" },
  { id: 2, title: "Prepare Education Budget", name: "Murugan", department: "Education", status: "In Progress", dueDate: "2025-03-07", attachment: "https://example.com/file2.pdf", createdAt: "2025-03-06T10:30:00Z" },
  { id: 3, title: "Worker Safety Inspection", name: "Siva", department: "Labor", status: "Completed", dueDate: "2025-03-06", attachment: "https://example.com/file3.jpg", createdAt: "2025-03-05T14:45:00Z" },
  { id: 4, title: "Audit Co-operative Society", name: "Kumar", department: "Co-operation & Food", status: "Pending", dueDate: "2025-03-08", attachment: "https://example.com/file4.png", createdAt: "2025-03-07T09:15:00Z" },
  { id: 5, title: "New Road Layout Plan", name: "Arun", department: "Town Planning", status: "In Progress", dueDate: "2025-03-07", attachment: "https://example.com/file5.pdf", createdAt: "2025-03-06T16:00:00Z" },
  { id: 6, title: "Annual Finance Report", name: "Suresh", department: "Finance", status: "Completed", dueDate: "2025-03-06", attachment: "https://example.com/file6.pdf", createdAt: "2025-03-05T11:20:00Z" },
  { id: 7, title: "Resolve Customer Complaints", name: "Ramachandran", department: "Customer Support", status: "Pending", dueDate: "2025-03-08", attachment: "https://example.com/file7.jpg", createdAt: "2025-03-07T07:45:00Z" },
  { id: 8, title: "Draft Legal Contract", name: "Venkatesh", department: "Legal", status: "In Progress", dueDate: "2025-03-07", attachment: "https://example.com/file8.png", createdAt: "2025-03-06T13:10:00Z" },
  { id: 9, title: "Implement IT Support Ticketing", name: "Sethupathi", department: "Support", status: "Completed", dueDate: "2025-03-06", attachment: "https://example.com/file9.pdf", createdAt: "2025-03-05T15:30:00Z" },
  { id: 10, title: "Process Fine Payments", name: "Balaji", department: "Fine", status: "Pending", dueDate: "2025-03-08", attachment: "https://example.com/file10.pdf", createdAt: "2025-03-07T08:20:00Z" },
  { id: 11, title: "Review Law & Order Case", name: "Ezhilarasi", department: "Law and Order", status: "In Progress", dueDate: "2025-03-07", attachment: "https://example.com/file11.jpg", createdAt: "2025-03-06T09:00:00Z" },
  { id: 12, title: "General Office Maintenance", name: "Madhumitha", department: "More", status: "Completed", dueDate: "2025-03-06", attachment: "https://example.com/file12.png", createdAt: "2025-03-05T12:45:00Z" }
];