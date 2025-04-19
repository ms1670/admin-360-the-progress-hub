import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// Fetch all tasks
export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new task
export const addTask = async (task: any) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Update a task
export const updateTask = async (id: number, updatedData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
