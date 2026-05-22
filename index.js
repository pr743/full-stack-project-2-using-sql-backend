const express = require("express");
const cors = require("cors");

require("dotenv").config();

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const categoryRoutes = require("./routes/categoryRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const analyticsRoutes = require("./routes/analyticsRoutes");


const app = express();


app.use(cors());
app.use(express.json());



app.use("/api/users", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);



app.get("/", (req, res) => {
    res.send("Expense Tracker App Backend");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at  http://localhost:${PORT}`);
})