import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Navbar Section */}
      <nav style={styles.navbar}>
        <div style={styles.logoGroup}>
          <span style={styles.logoIcon}>📄</span>
          <span style={styles.logoText}>Smart Question Paper Builder</span>
        </div>
        <div style={styles.navButtons}>
          <button onClick={() => navigate("/login")} style={styles.loginBtn}>
            Login
          </button>
          <button onClick={() => navigate("/register")} style={styles.registerBtnNav}>
            Register Now
          </button>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main style={styles.heroSection}>
        
        {/* Left Side: Large Professional Text */}
        <div style={styles.leftContent}>
          <h1 style={styles.mainTitle}>
            Smart Question <br />
            <span style={styles.highlightText}>Paper Builder</span>
          </h1>
          <p style={styles.description}>
            Create university question papers easily with Department, Semester, 
            Subject, Course Outcome, and Syllabus Management.
          </p>
          <div style={styles.actionButtons}>
            <button onClick={() => navigate("/login")} style={styles.getStartedBtn}>
              Get Started
            </button>
            <button onClick={() => navigate("/register")} style={styles.registerBtnHero}>
              Register
            </button>
          </div>
        </div>

        {/* Right Side: Centered Faculty Portal */}
        <div style={styles.rightContent}>
          <div style={styles.portalCard}>
            <div style={styles.portalHeader}>
              <h2 style={styles.portalTitle}>Faculty Portal</h2>
              <p style={styles.portalSubtitle}>Manage Question Papers</p>
            </div>

            <div style={styles.featuresGrid}>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>📚</span>
                <span style={styles.featureText}>Department Management</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>📖</span>
                <span style={styles.featureText}>Semester Management</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>📘</span>
                <span style={styles.featureText}>Subject Management</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>🎯</span>
                <span style={styles.featureText}>Course Outcome</span>
              </div>
              <div style={{ ...styles.featureItem, gridColumn: "span 2" }}>
                <span style={styles.featureIcon}>📄</span>
                <span style={styles.featureText}>Upload Syllabus & Generate Papers</span>
              </div>
            </div>
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
    backgroundColor: "#F3F4F6",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 6%",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: { fontSize: "24px" },
  logoText: { fontSize: "20px", fontWeight: "800", color: "#111827" },
  navButtons: { display: "flex", gap: "12px" },
  loginBtn: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "14px",
    fontWeight: "700",
    color: "#4B5563",
    cursor: "pointer",
    padding: "10px 18px",
  },
  registerBtnNav: {
    backgroundColor: "#111827",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    padding: "10px 18px",
    cursor: "pointer",
  },
  heroSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "50px 6%",
    flex: 1,
    flexWrap: "wrap",
    gap: "40px",
  },
  leftContent: {
    flex: "1 1 480px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  mainTitle: {
    fontSize: "52px",
    fontWeight: "800",
    color: "#111827",
    lineHeight: "1.15",
    margin: "0",
  },
  highlightText: {
    color: "#8B5CF6",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#6B7280",
    maxWidth: "480px",
    margin: "0",
  },
  actionButtons: {
    display: "flex",
    gap: "14px",
    marginTop: "10px",
  },
  getStartedBtn: {
    backgroundColor: "#8B5CF6",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "700",
    padding: "16px 28px",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)",
  },
  registerBtnHero: {
    backgroundColor: "#FFFFFF",
    color: "#111827",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "700",
    padding: "16px 28px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0,0,0,0.01)",
  },
  rightContent: {
    flex: "1 1 420px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  portalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "28px",
    padding: "36px",
    width: "100%",
    maxWidth: "450px",
    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  portalHeader: {
    textAlign: "center",
    marginBottom: "28px",
  },
  portalTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#111827",
    margin: "0 0 6px 0",
  },
  portalSubtitle: {
    fontSize: "13px",
    color: "#9CA3AF",
    margin: "0",
    fontWeight: "500",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    width: "100%",
  },
  featureItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #F3F4F6",
    textAlign: "center",
    gap: "10px",
  },
  featureIcon: {
    fontSize: "24px",
  },
  featureText: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#374151",
    lineHeight: "1.3",
  },
};

export default Home;