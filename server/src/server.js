import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

connectDB();
  
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
