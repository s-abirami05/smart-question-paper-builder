import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/auth-bg.jpg.jpeg"; 

// Anna University 2021 Regulation (IT Department) Subject Data
const annaUnivITSubjects = {
  "1": [
    { code: "HS3151", name: "Professional English - I" },
    { code: "MA3151", name: "Matrices and Calculus" },
    { code: "PH3151", name: "Engineering Physics" },
    { code: "CY3151", name: "Engineering Chemistry" },
    { code: "GE3151", name: "Problem Solving and Python Programming" },
  ],
  "2": [
    { code: "HS3251", name: "Professional English - II" },
    { code: "MA3251", name: "Statistics and Numerical Methods" },
    { code: "PH3256", name: "Physics for Information Science" },
    { code: "BE3251", name: "Basic Electrical and Electronics Engineering" },
    { code: "GE3251", name: "Engineering Graphics" },
    { code: "CS3251", name: "Programming in C" },
  ],
  "3": [
    { code: "MA3354", name: "Discrete Mathematics" },
    { code: "CS3351", name: "Digital Principles and Computer Organization" },
    { code: "CS3352", name: "Foundations of Data Science" },
    { code: "CD3291", name: "Data Structures" },
    { code: "CS3391", name: "Object Oriented Programming" },
  ],
  "4": [
    { code: "CS3452", name: "Theory of Computation" },
    { code: "CS3491", name: "Artificial Intelligence and Machine Learning" },
    { code: "CS3492", name: "Database Management Systems" },
    { code: "IT3401", name: "Web Essentials" },
    { code: "CS3451", name: "Introduction to Operating Systems" },
  ],
  "5": [
    { code: "CS3591", name: "Computer Networks" },
    { code: "IT3501", name: "Full Stack Development" },
    { code: "CS3551", name: "Distributed Computing" },
    { code: "CCS334", name: "Big Data Analytics" },
  ],
  "6": [
    { code: "CCS356", name: "Object Oriented Software Engineering" },
    { code: "IT3681", name: "Mobile Application Development" },
    { code: "CCS370", name: "UI and UX Design" },
    { code: "CCS342", name: "Cloud Computing" },
  ],
  "7": [
    { code: "GE3791", name: "Human Values and Ethics" },
    { code: "CCS335", name: "Cloud Services Management" },
    { code: "CCS354", name: "Network Security" },
  ],
  "8": [
    { code: "IT3811", name: "Project Work / Internship" },
  ],
};

function Dashboard() {
  const navigate = useNavigate();

  const collegeName = "AVC COLLEGE OF ENGINEERING MANNAMPANDAL";
  const department = "B.Tech INFORMATION TECHNOLOGY";
  const regulation = "Regulation 2021";
  const duration = "THREE Hours";
  const maxMarks = "100";

  const [ciaType, setCiaType] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // 👉 Date-la irunthu Month & Year eduthu CIA Test-oda serthu dynamic-ah generate panrom
  const getFormattedCiaTest = () => {
    if (!ciaType) return "";
    if (!examDate) return ciaType;
    
    const dateObj = new Date(examDate);
    const monthName = dateObj.toLocaleString('en-US', { month: 'long' });
    const yearValue = dateObj.getFullYear();

    return `${ciaType} - ${monthName} ${yearValue}`;
  };

  const handleSemesterChange = (e) => {
    const selectedSem = e.target.value;
    setSemester(selectedSem);
    setSelectedSubject("");
    setSubjectCode("");
  };

  const handleSubjectChange = (e) => {
    const subName = e.target.value;
    setSelectedSubject(subName);

    const subList = annaUnivITSubjects[semester] || [];
    const foundSubject = subList.find((item) => item.name === subName);

    if (foundSubject) {
      setSubjectCode(foundSubject.code);
    } else {
      setSubjectCode("");
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!ciaType || !semester || !selectedSubject || !examDate || !examTime) {
      alert("Please fill in all required fields!");
      return;
    }

    const finalCiaTestString = getFormattedCiaTest();

    const paperConfig = {
      collegeName,
      department,
      regulation,
      ciaTest: finalCiaTestString,
      examDate,
      examTime,
      duration,
      maxMarks,
      semester,
      subjectName: selectedSubject,
      subjectCode,
    };
    localStorage.setItem("paperConfig", JSON.stringify(paperConfig));

    navigate("/builder"); 
  };

  return (
    <div style={{ ...styles.bg, backgroundImage: `url(${bgImage})` }}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={styles.docIcon}>📄</span>
        </div>

        <h2 style={styles.title}>Question Paper Generator</h2>
        <p style={styles.subtitle}>
          Select the details to generate your customized question paper
        </p>

        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, backgroundColor: "#0284C7" }}></div>
          <div style={styles.progressBar}></div>
          <div style={styles.progressBar}></div>
          <div style={styles.progressBar}></div>
        </div>

        <form onSubmit={handleContinue} style={styles.formGroup}>
          {/* COLLEGE NAME */}
          <div style={styles.field}>
            <label style={styles.label}>COLLEGE NAME</label>
            <div style={styles.selectWrapper}>
              <span style={styles.fieldIcon}>🏛️</span>
              <input type="text" value={collegeName} readOnly style={styles.inputReadOnly} />
            </div>
          </div>

          {/* DEPARTMENT & REGULATION */}
          <div style={styles.rowGroup}>
            <div style={{ ...styles.field, flex: 2 }}>
              <label style={styles.label}>DEPARTMENT</label>
              <div style={styles.selectWrapper}>
                <span style={styles.fieldIcon}>🎓</span>
                <input type="text" value={department} readOnly style={styles.inputReadOnly} />
              </div>
            </div>
            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>REGULATION</label>
              <div style={styles.selectWrapper}>
                <span style={styles.fieldIcon}>📜</span>
                <input type="text" value={regulation} readOnly style={styles.inputReadOnly} />
              </div>
            </div>
          </div>

          {/* EXAM DATE & CIA TEST ROW */}
          <div style={styles.rowGroup}>
            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>EXAM DATE</label>
              <div style={styles.selectWrapper}>
                <span style={styles.fieldIcon}>📅</span>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  style={styles.select}
                  required
                />
              </div>
            </div>

            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>CIA TEST</label>
              <div style={styles.selectWrapper}>
                <span style={styles.fieldIcon}>📝</span>
                <select
                  value={ciaType}
                  onChange={(e) => setCiaType(e.target.value)}
                  style={styles.select}
                  required
                >
                  <option value="">Select CIA</option>
                  <option value="I CIA TEST">I CIA TEST</option>
                  <option value="II CIA TEST">II CIA TEST</option>
                </select>
              </div>
            </div>
          </div>

          {/* PREVIEW OF DYNAMICALLY GENERATED CIA WITH MONTH & YEAR */}
          {examDate && ciaType && (
            <div style={styles.previewBox}>
              <span style={{ fontSize: "12px", color: "#0369A1", fontWeight: "700" }}>
                📌 Title Preview: {getFormattedCiaTest()}
              </span>
            </div>
          )}

          {/* SEMESTER */}
          <div style={styles.field}>
            <label style={styles.label}>SEMESTER</label>
            <div style={styles.selectWrapper}>
              <span style={styles.fieldIcon}>🗓️</span>
              <select
                value={semester}
                onChange={handleSemesterChange}
                style={styles.select}
                required
              >
                <option value="">Select semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>
          </div>

          {/* SUBJECT NAME */}
          <div style={styles.field}>
            <label style={styles.label}>SUBJECT NAME</label>
            <div style={styles.selectWrapper}>
              <span style={styles.fieldIcon}>📖</span>
              <select
                value={selectedSubject}
                onChange={handleSubjectChange}
                style={styles.select}
                disabled={!semester}
                required
              >
                <option value="">
                  {semester ? "Select Subject" : "Select Semester First"}
                </option>
                {semester &&
                  annaUnivITSubjects[semester]?.map((sub) => (
                    <option key={sub.code} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* SUBJECT CODE */}
          <div style={styles.field}>
            <label style={styles.label}>SUBJECT CODE</label>
            <div style={styles.selectWrapper}>
              <span style={styles.fieldIcon}>&#123;&#125;</span>
              <input
                type="text"
                readOnly
                placeholder="{}"
                value={subjectCode}
                style={styles.inputReadOnlyCode}
              />
            </div>
          </div>

          {/* EXAM TIME */}
          <div style={styles.field}>
            <label style={styles.label}>EXAM TIME</label>
            <div style={styles.selectWrapper}>
              <span style={styles.fieldIcon}>⏰</span>
              <select
                value={examTime}
                onChange={(e) => setExamTime(e.target.value)}
                style={styles.select}
                required
              >
                <option value="">Select Time Slot</option>
                <option value="9:30 AM to 12:30 PM">Morning (9:30 AM to 12:30 PM)</option>
                <option value="1:00 PM to 4:00 PM">Afternoon (1:00 PM to 4:00 PM)</option>
              </select>
            </div>
          </div>

          {/* DURATION & MAX MARKS ROW */}
          <div style={styles.rowGroup}>
            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>DURATION</label>
              <div style={styles.selectWrapper}>
                <span style={styles.fieldIcon}>⏳</span>
                <input type="text" value={duration} readOnly style={styles.inputReadOnly} />
              </div>
            </div>

            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>MAX. MARKS</label>
              <div style={styles.selectWrapper}>
                <span style={styles.fieldIcon}>🎯</span>
                <input type="text" value={maxMarks} readOnly style={styles.inputReadOnly} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              ...styles.continueBtn,
              transform: isHovered ? "translateY(-2px)" : "translateY(0px)",
              boxShadow: isHovered
                ? "0 10px 25px rgba(2, 132, 199, 0.5)"
                : "0 4px 15px rgba(2, 132, 199, 0.3)",
            }}
          >
            Create Question Paper
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "left center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    padding: "30px 20px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "20px",
    padding: "35px 30px",
    width: "100%",
    maxWidth: "560px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#0284C7",
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },
  docIcon: { fontSize: "22px", color: "#FFFFFF" },
  title: { fontSize: "26px", fontWeight: "900", color: "#0F172A", margin: "0 0 6px 0", letterSpacing: "-0.5px", textAlign: "center" },
  subtitle: {
    fontSize: "14px",
    color: "#475569",
    fontWeight: "600",
    margin: "0 0 24px 0",
    textAlign: "center",
  },
  progressContainer: {
    display: "flex",
    gap: "8px",
    width: "100%",
    marginBottom: "24px",
  },
  progressBar: {
    flex: 1,
    height: "4px",
    backgroundColor: "#E2E8F0",
    borderRadius: "4px",
  },
  formGroup: { width: "100%", display: "flex", flexDirection: "column", gap: "16px" },
  rowGroup: { display: "flex", gap: "12px", width: "100%" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "11px", fontWeight: "800", color: "#0F172A", letterSpacing: "0.8px" },
  selectWrapper: { position: "relative", display: "flex", alignItems: "center" },
  fieldIcon: { position: "absolute", left: "14px", fontSize: "15px", color: "#64748b" },
  previewBox: {
    backgroundColor: "#E0F2FE",
    border: "1px solid #BAE6FD",
    padding: "10px 14px",
    borderRadius: "10px",
    marginTop: "-4px",
  },
  select: {
    width: "100%",
    padding: "13px 14px 13px 42px",
    borderRadius: "14px",
    border: "1.5px solid #CBD5E1",
    backgroundColor: "#FFFFFF",
    fontSize: "14px",
    color: "#0F172A",
    fontWeight: "600",
    outline: "none",
    cursor: "pointer",
  },
  inputReadOnly: {
    width: "100%",
    padding: "13px 14px 13px 42px",
    borderRadius: "14px",
    border: "1.5px solid #CBD5E1",
    backgroundColor: "#F8FAFC",
    fontSize: "13px",
    color: "#334155",
    fontWeight: "700",
    outline: "none",
  },
  inputReadOnlyCode: {
    width: "100%",
    padding: "13px 14px 13px 42px",
    borderRadius: "14px",
    border: "1.5px solid #CBD5E1",
    backgroundColor: "#F8FAFC",
    fontSize: "14px",
    color: "#0284C7",
    fontWeight: "800",
    outline: "none",
  },
  continueBtn: {
    width: "100%",
    padding: "15px",
    borderRadius: "14px",
    border: "none",
    backgroundColor: "#0284C7",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "8px",
    transition: "all 0.3s ease",
  },
};

export default Dashboard;