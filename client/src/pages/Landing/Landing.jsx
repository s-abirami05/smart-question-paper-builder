import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/laptop-bg.jpg.jpeg"; 

export default function Landing() {
  const navigate = useNavigate();
  
  // Hover states for navbar buttons and hero button
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isRegisterHovered, setIsRegisterHovered] = useState(false);
  const [isGetStartedHovered, setIsGetStartedHovered] = useState(false);

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${bgImage})` }}>
      {/* Navbar Section */}
      <nav style={styles.navbar}>
        <div style={styles.logoGroup}>
          <span style={styles.logoIcon}>🎓</span>
          <span style={styles.logoText}>
            <span style={styles.smartText}>Smart</span> <span style={styles.questionPaperText}>Question Paper</span> Builder
          </span>
        </div>
        <div style={styles.navButtons}>
          {/* Navbar Login Button - Styled like Register outline button */}
          <button 
            onClick={() => navigate("/login")} 
            onMouseEnter={() => setIsLoginHovered(true)}
            onMouseLeave={() => setIsLoginHovered(false)}
            style={{
              ...styles.navLoginBtn,
              backgroundColor: isLoginHovered ? "#000000" : "transparent",
              color: isLoginHovered ? "#FFFFFF" : "#000000",
              transform: isLoginHovered ? "translateY(-2px) scale(1.02)" : "translateY(0px) scale(1)",
            }}
          >
            Login
          </button>

          {/* Navbar Register Button */}
          <button 
            onClick={() => navigate("/register")} 
            onMouseEnter={() => setIsRegisterHovered(true)}
            onMouseLeave={() => setIsRegisterHovered(false)}
            style={{
              ...styles.navRegisterBtn,
              backgroundColor: isRegisterHovered ? "#000000" : "#0F172A",
              transform: isRegisterHovered ? "translateY(-2px) scale(1.02)" : "translateY(0px) scale(1)",
            }}
          >
            Register
          </button>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main style={styles.heroSection}>
        <div style={styles.leftContent}>
          <h1 style={styles.mainTitle}>
            <span style={styles.smartTextLarge}>Smart</span> <br />
            <span style={styles.questionPaperTextLarge}>Question Paper</span> <br />
            <span style={styles.builderText}>Builder</span>
          </h1>
          <p style={styles.description}>
            Create university question papers easily with Department, Semester, 
            Subject, Course Outcome, and Syllabus Management.
          </p>
          <div style={styles.actionButtons}>
            {/* Get Started Button */}
            <button 
              onClick={() => navigate("/register")} 
              onMouseEnter={() => setIsGetStartedHovered(true)}
              onMouseLeave={() => setIsGetStartedHovered(false)}
              style={{
                ...styles.getStartedBtn,
                backgroundColor: isGetStartedHovered ? "#000000" : "transparent",
                color: isGetStartedHovered ? "#FFFFFF" : "#000000",
                transform: isGetStartedHovered ? "translateY(-3px) scale(1.03)" : "translateY(0px) scale(1)",
                boxShadow: isGetStartedHovered 
                  ? "0 8px 25px rgba(0, 0, 0, 0.4)" 
                  : "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </main>
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
    flexDirection: "column",
    boxSizing: "border-box",
    overflowX: "hidden",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 6%",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    width: "100%",
    boxSizing: "border-box",
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: { fontSize: "24px" },
  logoText: { fontSize: "18px", fontWeight: "800" },
  smartText: { color: "#000000" },
  questionPaperText: { color: "#0284C7" },
  navButtons: { display: "flex", gap: "12px", alignItems: "center" },
  navLoginBtn: {
    backgroundColor: "transparent",
    color: "#000000",
    border: "2px solid #000000",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    padding: "8px 18px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  navRegisterBtn: {
    backgroundColor: "#0F172A",
    color: "#FFFFFF",
    border: "2px solid #0F172A",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    padding: "8px 18px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  heroSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "40px 6%",
    flex: 1,
    boxSizing: "border-box",
  },
  leftContent: {
    width: "100%",
    maxWidth: "540px",
    display: "flex",
    flexDirection: "column",
    gap: "22px",
    backgroundColor: "transparent",
    padding: "0",
    boxShadow: "none",
  },
  mainTitle: {
    fontSize: "60px",
    fontWeight: "900",
    lineHeight: "1.1",
    margin: "0",
    letterSpacing: "-1.5px",
    textShadow: "0 2px 12px rgba(255,255,255,0.9)",
  },
  smartTextLarge: { color: "#000000" },
  questionPaperTextLarge: { color: "#0284C7" },
  builderText: { color: "#0F172A" },
  description: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#0F172A",
    margin: "0",
    fontWeight: "700",
    textShadow: "0 1px 8px rgba(255,255,255,0.9)",
  },
  actionButtons: {
    display: "flex",
    gap: "14px",
    marginTop: "5px",
  },
  getStartedBtn: {
    backgroundColor: "transparent",
    color: "#000000",
    border: "2px solid #000000",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "700",
    padding: "13px 32px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};