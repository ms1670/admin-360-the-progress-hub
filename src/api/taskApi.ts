import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";


// Fetch all tasks
// export const fetchTasks = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     throw new Error("Unable to fetch tasks");
//   }
// };

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Fetch tasks response:", response);  // Log the full response
    return response.data;
  } catch (error: any) {
    console.error("Error fetching tasks:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Status code:", error.response.status);
      console.error("Headers:", error.response.headers);
    }
    throw new Error("Unable to fetch tasks");
  }
};


// Add a new task
export const addTask = async (task: any) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Unable to add task");
  }
};

// Update a task
export const updateTask = async (id: number, updatedData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Unable to update task");
  }
};

// Delete a task
export const deleteTask = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Unable to delete task");
  }
};


// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/tasks';

// // Fetch all tasks
// export const fetchTasks = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

// // Add a new task
// export const addTask = async (task: any) => {
//   const response = await axios.post(API_URL, task);
//   return response.data;
// };

// // Update a task
// export const updateTask = async (id: number, updatedData: any) => {
//   const response = await axios.put(`${API_URL}/${id}`, updatedData);
//   return response.data;
// };

// // Delete a task
// export const deleteTask = async (id: number) => {
//   const response = await axios.delete(`${API_URL}/${id}`);
//   return response.data;
// };
