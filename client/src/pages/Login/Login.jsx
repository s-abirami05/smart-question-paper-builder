import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/auth-bg.jpg.jpeg"; 

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 👉 Inline Forgot Password toggling states
  const [showForgotPasswordBox, setShowForgotPasswordBox] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAlertMessage("");

    if (!formData.email || !formData.password) {
      setAlertMessage("Please fill in all fields.");
      setIsSuccess(false);
      return;
    }

    setIsSuccess(true);
    setAlertMessage("Login successful! Redirecting to dashboard...");
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const handleSendResetEmail = async (e) => {
    e.preventDefault();

    if (!resetEmail || !resetEmail.includes("@") || !resetEmail.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: resetEmail,
          subjectText: "Password Reset Request - Smart Question Paper",
          messageHtml: `
            <div style="font-family: Arial, sans-serif; padding: 25px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h2 style="color: #0284C7; margin-top: 0;">Password Reset Request</h2>
              <p style="color: #334155; font-size: 15px;">Hello,</p>
              <p style="color: #334155; font-size: 15px;">We received a request to reset your password for your Smart Question Paper Builder account.</p>
              <div style="text-align: center; margin: 25px 0;">
                <a href="http://localhost:5173/reset-password" style="background: #0284C7; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">Reset Password</a>
              </div>
              <p style="margin-top: 25px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 15px;">If you did not request this, please ignore this email.</p>
            </div>
          `,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        // 👉 Success page-ku navigate panrom
        navigate("/forgot-password-success", { state: { email: resetEmail } });
      } else {
        alert("Failed to send reset link. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending password reset email:", error);
      alert("Something went wrong! Make sure your backend server is running.");
    }
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${bgImage})` }}>
      {alertMessage && (
        <div style={{ ...styles.popup, backgroundColor: isSuccess ? "#10B981" : "#EF4444" }}>
          {isSuccess ? "🎉 " : "⚠️ "} {alertMessage}
        </div>
      )}

      {loading && (
        <div style={styles.loaderOverlay}>
          <div style={styles.loaderBox}>
            <div style={styles.spinner}></div>
            <p style={{ fontWeight: "700", color: "#0F172A", margin: "0" }}>Sending reset link to email...</p>
          </div>
        </div>
      )}

      <div style={styles.formCard}>
        <div style={styles.headerSection}>
          <div style={styles.iconBox}>🔐</div>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to access your Faculty Portal</p>
        </div>

        {/* 👉 Forgot Password Box OR Login Form switch aagum */}
        {showForgotPasswordBox ? (
          <div style={styles.forgotBox}>
            <h3 style={{ margin: "0 0 10px 0", color: "#0F172A", fontSize: "18px" }}>Reset Password</h3>
            <p style={{ margin: "0 0 15px 0", fontSize: "13px", color: "#475569" }}>
              Enter your registered email address and we'll send you a reset link.
            </p>
            <form onSubmit={handleSendResetEmail} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>✉️</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <button type="submit" style={styles.submitBtn}>
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setShowForgotPasswordBox(false)}
                style={styles.backBtn}
              >
                Back to Login
              </button>
            </form>
          </div>
        ) : (
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>MAIL ID</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.passwordHeader}>
                <label style={styles.label}>PASSWORD</label>
                <span onClick={() => setShowForgotPasswordBox(true)} style={styles.forgotLink}>
                  Forgot Password
                </span>
              </div>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
                <span 
                  onClick={() => setShowPassword(!showPassword)} 
                  style={styles.eyeIcon}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>

            <button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                ...styles.submitBtn,
                transform: isHovered ? "translateY(-2px)" : "translateY(0px)",
                boxShadow: isHovered
                  ? "0 10px 25px rgba(2, 132, 199, 0.5)"
                  : "0 4px 15px rgba(2, 132, 199, 0.3)",
              }}
            >
              Log In
            </button>
          </form>
        )}

        {!showForgotPasswordBox && (
          <div style={styles.footerText}>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} style={styles.link}>
              Register Now
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "left center",
    backgroundRepeat: "no-repeat",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "20px",
    position: "relative",
  },
  popup: {
    position: "absolute",
    top: "30px",
    color: "#FFFFFF",
    padding: "14px 24px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    maxWidth: "480px",
    textAlign: "center",
  },
  loaderOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  loaderBox: {
    backgroundColor: "#ffffff",
    padding: "24px 32px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #0284C7",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  formCard: {
    width: "100%",
    maxWidth: "480px",
    backgroundColor: "transparent",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    boxShadow: "none",
  },
  forgotBox: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    backdropFilter: "blur(6px)",
  },
  backBtn: {
    backgroundColor: "transparent",
    color: "#64748b",
    border: "1.5px solid #CBD5E1",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "700",
    height: "48px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  headerSection: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  iconBox: {
    fontSize: "36px",
    marginBottom: "2px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "900",
    color: "#0F172A",
    margin: "0",
    letterSpacing: "-0.5px",
    textShadow: "0 2px 10px rgba(255, 255, 255, 0.8)",
  },
  subtitle: {
    fontSize: "15px",
    color: "#1E293B",
    fontWeight: "700",
    margin: "0",
    textShadow: "0 1px 6px rgba(255, 255, 255, 0.8)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  passwordHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: "0.8px",
  },
  forgotLink: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#0284C7",
    cursor: "pointer",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    border: "1.5px solid #CBD5E1",
    borderRadius: "14px",
    padding: "0 16px",
    height: "54px",
    backdropFilter: "blur(6px)",
  },
  inputIcon: {
    fontSize: "18px",
    marginRight: "12px",
  },
  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    width: "100%",
    fontSize: "15px",
    color: "#0F172A",
    fontWeight: "600",
  },
  eyeIcon: {
    fontSize: "18px",
    cursor: "pointer",
    marginLeft: "12px",
    userSelect: "none",
  },
  submitBtn: {
    backgroundColor: "#0284C7",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "700",
    height: "52px",
    cursor: "pointer",
    marginTop: "8px",
    transition: "all 0.3s ease",
  },
  footerText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#1E293B",
    fontWeight: "700",
    marginTop: "2px",
    textShadow: "0 1px 6px rgba(255, 255, 255, 0.8)",
  },
  link: {
    color: "#0284C7",
    fontWeight: "800",
    cursor: "pointer",
    textDecoration: "underline",
  },
};