import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. NODEMAILER TRANSPORTER SETUP ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chalschals0421@gmail.com",       // Unga Gmail ID
    pass: "dvab bvwm lzkr jnqh",         // Unga 16-digit Google App Password (Normal password kudukka koodathu!)
  },
});

// --- 2. MAIL SENDING API ROUTE ---
app.post("/api/send-mail", async (req, res) => {
  const { recipientEmail, subjectText, messageHtml } = req.body;

  try {
    const mailOptions = {
      from: '"Your App Name" <your-email@gmail.com>',
      to: recipientEmail, // Yaaruku mail poganumo avanga email
      subject: subjectText || "Test Subject",
      html: messageHtml || "<h3>Hello from Nodemailer!</h3>",
    };

    // Mail anuppura function
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Mail sent successfully!" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ success: false, message: "Failed to send mail", error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});