const { Pool } = require("pg");
require("dotenv").config();

// Log the environment variables to verify their values
console.log("Database Configuration:");
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);

const pool = new Pool({
    user: process.env.DB_USER || "postgres", // Fallback to "postgres"
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "task_management",
    password: process.env.DB_PASSWORD || "postgres",
    port: parseInt(process.env.DB_PORT, 10) || 5432,
});

pool.connect((err) => {
    if (err) {
        console.error("❌ Error connecting to the database:", err.message);
    } else {
        console.log("✅ Successfully connected to the PostgreSQL database");
    }
});

module.exports = pool;

// const { Pool } = require("pg");
// require("dotenv").config();

// console.log("🔍 DB Config:", {
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS ? "********" : "NOT SET",
//   port: process.env.DB_PORT
// });

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

// pool.connect()
//     .then(() => console.log("✅ Connected to PostgreSQL"))
//     .catch(err => console.error("❌ Database connection error:", err));

// module.exports = pool;



// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT,
// });

// pool.connect()
//     .then(() => console.log("✅ Connected to PostgreSQL"))
//     .catch(err => console.error("❌ Database connection error:", err));

// module.exports = pool;
