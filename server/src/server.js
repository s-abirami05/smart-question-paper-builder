import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose"; // MongoDB connection-க்காக

// Question Routes Import செய்கிறோம்
import questionRoutes from "./routes/questionRoutes.js"; 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. MONGODB DATABASE CONNECTION ---
// உங்கள் MongoDB URL-ஐ .env கோப்பிலோ அல்லது நேரடியாகவோ கொடுக்கவும்
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/question_paper_db";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// --- 2. QUESTION PAPER API ROUTES ---
// Frontend /api/question-paper/save, /list, /update போன்றவற்றை இது கவனித்துக் கொள்ளும்
app.use("/api/question-paper", questionRoutes);

// --- 3. NODEMAILER TRANSPORTER SETUP ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "chalschals0421@gmail.com",
    pass: process.env.EMAIL_PASS || "dvab bvwm lzkr jnqh",
  },
});

// --- 4. MAIL SENDING API ROUTE ---
app.post("/api/send-mail", async (req, res) => {
  const { recipientEmail, subjectText, messageHtml } = req.body;

  try {
    const mailOptions = {
      from: `"Question Paper Portal" <${process.env.EMAIL_USER || "chalschals0421@gmail.com"}>`,
      to: recipientEmail,
      subject: subjectText || "Test Subject",
      html: messageHtml || "<h3>Hello from Nodemailer!</h3>",
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Mail sent successfully!" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ success: false, message: "Failed to send mail", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});