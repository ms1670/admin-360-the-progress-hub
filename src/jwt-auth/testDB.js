const pool = require("./config/db");

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Database Connected Successfully:", result.rows[0]);
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
  }
}

testDB();
