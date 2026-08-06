const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// 1. Email Transporter Setup (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com", // உங்கள் ஜிமெயில் ஐடி (Your Gmail ID)
    pass: "your-app-password",     // Gmail App Password (16 digit code)
  },
});

// API: Send Password Reset Link
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email required" });

  // Frontend login or password reset page URL (Neenga React run panra localhost link)
  const resetLink = "http://localhost:5173/login"; 

  const mailOptions = {
    from: '"Smart Question Paper Builder" <your-email@gmail.com>',
    to: email,
    subject: "Password Reset Request - Smart Question Paper Builder",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 25px; border: 1px solid #e2e8f0; border-radius: 10px; max-width: 500px; margin: auto;">
        <h2 style="color: #0284C7; text-align: center;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password for your Faculty Portal account. Click the button below to proceed:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #0284C7; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Reset Password</a>
        </div>
        
        <p style="color: #64748b; font-size: 13px;">If you didn't request this password reset, please ignore this email. Your account remains secure.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">Smart Question Paper Builder System</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Password reset link sent successfully via Nodemailer!" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ success: false, message: "Failed to send reset email" });
  }
});

module.exports = router;