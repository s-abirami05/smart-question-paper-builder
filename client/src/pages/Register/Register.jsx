import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/auth-bg.jpg.jpeg";
import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage("");

    // Password validation
    const password = formData.password;

    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      !minLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setIsSuccess(false);
      setAlertMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      await registerUser(formData);

      const data = await registerUser({
        name,
        email,
        password,
      });

      alert(data.message);

      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to Login Page
      navigate("/login");
      setIsSuccess(true);
      setAlertMessage(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setIsSuccess(false);
      setAlertMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Faculty Register
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 mb-4 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Register
          </button>

        </form>

    <div
      style={{
        ...styles.container,
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Alert / Success Popup */}
      {alertMessage && (
        <div
          style={{
            ...styles.popup,
            backgroundColor: isSuccess ? "#10B981" : "#EF4444",
          }}
        >
          {isSuccess ? "🎉 " : "⚠️ "}
          {alertMessage}
        </div>
      )}

      {/* Form Card */}
      <div style={styles.formCard}>
        {/* Header */}
        <div style={styles.headerSection}>
          <div style={styles.iconBox}>💻</div>

          <h2 style={styles.title}>Create Account</h2>

          <p style={styles.subtitle}>
            Sign up to access your Faculty Portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Full Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>FULL NAME</label>

            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>👤</span>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>MAIL ID</label>

            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>📩</span>

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

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>PASSWORD</label>

            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🔒</span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter secure password"
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

            <span style={styles.passwordHint}>
              Must contain 8+ chars, uppercase, lowercase, number & symbol.
            </span>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              ...styles.submitBtn,
              transform: isHovered
                ? "translateY(-2px)"
                : "translateY(0px)",
              boxShadow: isHovered
                ? "0 10px 25px rgba(2, 132, 199, 0.4)"
                : "0 4px 12px rgba(2, 132, 199, 0.25)",
            }}
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <div style={styles.footerText}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={styles.link}
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
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

  formCard: {
    width: "100%",
    maxWidth: "480px",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    borderRadius: "24px",
    padding: "45px 40px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
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
  },

  subtitle: {
    fontSize: "15px",
    color: "#475569",
    fontWeight: "600",
    margin: "0",
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

  label: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#1E293B",
    letterSpacing: "0.8px",
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "1.5px solid #CBD5E1",
    borderRadius: "14px",
    padding: "0 16px",
    height: "54px",
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
    fontWeight: "500",
  },

  eyeIcon: {
    fontSize: "18px",
    cursor: "pointer",
    marginLeft: "12px",
    userSelect: "none",
  },

  passwordHint: {
    fontSize: "11px",
    color: "#64748B",
    fontWeight: "600",
    marginLeft: "4px",
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
    color: "#475569",
    fontWeight: "600",
    marginTop: "2px",
  },

  link: {
    color: "#0284C7",
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
