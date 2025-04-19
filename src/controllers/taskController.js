const db = require('../jwt-auth/config/db');

// Fetch all tasks
const getAllTasks = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tasklist');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a new task
const addTask = async (req, res) => {
  const { title, name, department, dueDate, attachment, status } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO tasklist (title, name, department, dueDate, attachment, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, name, department, dueDate, attachment, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, name, department, dueDate, attachment, status } = req.body;
  try {
    const result = await db.query(
      'UPDATE tasklist SET title=$1, name=$2, department=$3, dueDate=$4, attachment=$5, status=$6 WHERE id=$7 RETURNING *',
      [title, name, department, dueDate, attachment, status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM tasklist WHERE id=$1', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllTasks, addTask, updateTask, deleteTask };
