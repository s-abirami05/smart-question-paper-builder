import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ForgotPasswordSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  // Login page-lerunthu anuppina email-a inga catch panrom
  const email = location.state?.email || "your email";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✉️</div>
        <h2 style={styles.title}>Check Your Inbox</h2>
        <p style={styles.text}>
          We have successfully sent a password reset link to <br />
          <strong style={{ color: "#0284C7" }}>{email}</strong>
        </p>
        <p style={styles.subtext}>
          Please check your inbox (and All Mail / Spam folder) and click the link to reset your password.
        </p>

        <button onClick={() => navigate("/")} style={styles.btn}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px 30px",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    maxWidth: "450px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "5px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#0F172A",
    margin: "0",
  },
  text: {
    fontSize: "15px",
    color: "#334155",
    lineHeight: "1.5",
    margin: "0",
  },
  subtext: {
    fontSize: "13px",
    color: "#64748b",
    lineHeight: "1.4",
    margin: "0",
  },
  btn: {
    backgroundColor: "#0284C7",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background 0.2s",
  },
};