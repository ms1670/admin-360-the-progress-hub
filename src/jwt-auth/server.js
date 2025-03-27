const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const users = [{ email: "admin@example.com", password: "password123" }]; // Sample User

app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, "your_jwt_secret", { expiresIn: "1h" });
    res.json({ token });
});

app.listen(5000, () => console.log("Server running on port 5000"));


// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/auth", authRoutes);

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
