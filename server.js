const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
// require("dotenv").config();  // Only here once
require("dotenv").config({ path: "./src/jwt-auth/.env" });

const pool = require("./src/jwt-auth/config/db");

console.log("DB_USER from env:", process.env.DB_USER);
console.log("DB_PASSWORD from env:", process.env.DB_PASSWORD);

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


// OR
app.use(cors({
  origin: "http://localhost:3000", // Allow only frontend's origin
}));


console.log("Loaded ENV Variables:");
console.log("PORT:", process.env.PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

// Test PostgreSQL connection
pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error("Failed to connect to PostgreSQL", err.message));

// Health Check
app.get("/", (req, res) => {
    res.send("✅ Admin 360 - The Progress Hub API is running.");
});

// User login API
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
        const values = [email, password];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get all tasks from task_list
app.get("/api/tasks", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM task_list");
        console.log('Fetched tasks:', result.rows);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        res.status(500).json({ message: "Failed to retrieve tasks", error: error.message });
    }
});

// Error Handling for 404 Not Found
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Global error handler:", err.message);
    res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// Delete a task by ID
app.delete("/api/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {   
        const result = await pool.query("DELETE FROM task_list WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error.message);
        res.status(500).json({ message: "Failed to delete task", error: error.message });
    }
});

// Error Handling for 404 Not Found
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});



// const express = require("express");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const pool = require("./src/jwt-auth/config/db");


// dotenv.config();

// const app = express();
// app.use(express.json());

// app.use(cors({
//     origin: "http://localhost:3000", // Your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }));

// // User login API
// app.post("/api/auth/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Query to check user credentials
//         const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
//         const values = [email, password];

//         const result = await pool.query(query, values);

//         if (result.rows.length === 0) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
//         res.json({ token });
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });

// // Get all tasks from task_list
// app.get("/api/tasks", async (req, res) => {
//     try {
//         const result = await pool.query("SELECT * FROM task_list");
//         res.json(result.rows);
//     } catch (error) {
//         console.error("Error fetching tasks:", error);
//         res.status(500).json({ message: "Failed to retrieve tasks" });
//     }
// });

// // Health Check
// app.get("/", (req, res) => {
//     res.send("Admin 360 - The Progress Hub API is running.");
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
