import React, { useState } from "react";
import axios from "axios";

const autoDetectCOBLPI = (text) => {
  const lower = text.toLowerCase().trim();
  if (!lower) return { bl: "", co: "", pi: "" };

  if (lower.startsWith("define") || lower.startsWith("state") || lower.startsWith("list") || lower.startsWith("what")) {
    return { bl: "L1", co: "CO1", pi: "1.1.1" };
  } else if (lower.startsWith("explain") || lower.startsWith("describe") || lower.startsWith("discuss") || lower.startsWith("compare")) {
    return { bl: "L2", co: "CO2", pi: "2.1.2" };
  } else if (lower.startsWith("apply") || lower.startsWith("solve") || lower.startsWith("calculate") || lower.startsWith("derive")) {
    return { bl: "L3", co: "CO3", pi: "3.2.1" };
  } else if (lower.startsWith("analyze") || lower.startsWith("design") || lower.startsWith("evaluate") || lower.startsWith("develop")) {
    return { bl: "L4", co: "CO4", pi: "4.1.1" };
  }
  return { bl: "L2", co: "CO1", pi: "1.1.1" };
};

const subjectsBySemester = {
  "I": [
    { code: "HS3152", name: "Professional English - I" },
    { code: "MA3151", name: "Matrices and Calculus" },
    { code: "PH3151", name: "Engineering Physics" },
    { code: "CY3151", name: "Engineering Chemistry" },
    { code: "GE3151", name: "Problem Solving and Python Programming" },
    { code: "GE3152", name: "Heritage of Tamils" }
  ],
  "II": [
    { code: "HS3252", name: "Professional English - II" },
    { code: "MA3251", name: "Statistics and Numerical Methods" },
    { code: "PH3256", name: "Physics for Information Science" },
    { code: "BE3251", name: "Basic Electrical and Electronics Engineering" },
    { code: "GE3251", name: "Engineering Graphics" },
    { code: "CS3251", name: "Programming in C" },
    { code: "GE3252", name: "Tamils and Technology" }
  ],
  "III": [
    { code: "MA3354", name: "Discrete Mathematics" },
    { code: "CS3351", name: "Digital Principles and Computer Organization" },
    { code: "CS3352", name: "Foundations of Data Science" },
    { code: "CD3291", name: "Data Structures and Algorithms" },
    { code: "CS3391", name: "Object Oriented Programming" }
  ],
  "IV": [
    { code: "CS3452", name: "Theory of Computation" },
    { code: "CS3491", name: "Artificial Intelligence and Machine Learning" },
    { code: "CS3492", name: "Database Management Systems" },
    { code: "IT3401", name: "Web Essentials" },
    { code: "CS3451", name: "Introduction to Operating Systems" },
    { code: "GE3451", name: "Environmental Sciences and Sustainability" }
  ],
  "V": [
    { code: "CS3591", name: "Computer Networks" },
    { code: "IT3501", name: "Full Stack Web Development" },
    { code: "CS3551", name: "Distributed Computing" },
    { code: "CS3691", name: "Embedded Systems and IoT" },
    { code: "CCS341", name: "Data Warehousing" },
    { code: "CCS334", name: "Big Data Analytics" }
  ],
  "VI": [
    { code: "CCS356", name: "Object Oriented Software Engineering" },
    { code: "CCS335", name: "Cloud Computing" },
    { code: "CCS354", name: "Network Security" },
    { code: "CCS366", name: "Software Testing and Automation" },
    { code: "OBT351", name: "Food, Nutrition and Health" },
    { code: "IT3681", name: "Mobile App Development" }
  ],
  "VII": [
    { code: "GE3791", name: "Human Values and Ethics" },
    { code: "AI3021", name: "IT in Agriculture" },
    { code: "GE3752", name: "Total Quality management" },
    { code: "OHS352", name: "Project Report writing" }
  ],
  "VIII": []
};

export default function QuestionPaperBuilder() {
  const [editingId, setEditingId] = useState(null);
  const [savedPapersList, setSavedPapersList] = useState([]);
  const [showListModal, setShowListModal] = useState(false);

  const [header, setHeader] = useState({
    collegeName: "A.V.C. College Of Engineering , Mannampandal",
    examName: "I CIA TEST",
    examMonth: "August",
    examYear: "2026",
    branch: "B.TECH - INFORMATION TECHNOLOGY",
    section: "A",
    semester: "V",
    subjectCode: "CS3591",
    subjectName: "Computer Networks",
    regulation: "2021",
    duration: "Three Hours",
    date: "2026-08-11",
    time: "9:30 AM - 12:30 PM",
    maxMarks: "100",
  });

  const [subjectList, setSubjectList] = useState(subjectsBySemester["V"]);

  const formatDateDDMMYYYY = (rawDate) => {
    if (!rawDate) return "___";
    const parts = rawDate.split("-");
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return rawDate;
  };

  const [partA, setPartA] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      qNo: (i + 1).toString(),
      question: "",
      co: "",
      bl: "",
      pi: "",
    }))
  );

  const [partB, setPartB] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      qNo: (11 + i).toString(),
      typeA: "single",
      typeB: "single",
      optionA: {
        question: "",
        marks: "13",
        co: "",
        bl: "",
        pi: "",
        subQuestions: [
          { label: "i)", question: "", marks: "6", co: "", bl: "", pi: "" },
          { label: "ii)", question: "", marks: "7", co: "", bl: "", pi: "" },
        ],
      },
      optionB: {
        question: "",
        marks: "13",
        co: "",
        bl: "",
        pi: "",
        subQuestions: [
          { label: "i)", question: "", marks: "6", co: "", bl: "", pi: "" },
          { label: "ii)", question: "", marks: "7", co: "", bl: "", pi: "" },
        ],
      },
    }))
  );

  const [partC, setPartC] = useState({
    qNo: "16",
    optionA: { question: "", marks: "15", co: "", bl: "", pi: "" },
    optionB: { question: "", marks: "15", co: "", bl: "", pi: "" },
  });

  const fetchSavedPapers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/question-paper/list");
      setSavedPapersList(res.data);
      setShowListModal(true);
    } catch (err) {
      alert("Error fetching saved papers list");
    }
  };

  const loadPaperForEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/question-paper/${id}`);
      const paper = res.data;
      setEditingId(paper._id);
      
      const currentSemSubjects = subjectsBySemester[paper.semester] || [];
      setSubjectList(currentSemSubjects);

      setHeader({
        collegeName: paper.collegeName || "A.V.C. College Of Engineering , Mannampandal",
        examName: paper.examName || "I CIA TEST",
        examMonth: paper.examMonth || "August",
        examYear: paper.examYear || "2026",
        branch: paper.branch || "B.TECH - INFORMATION TECHNOLOGY",
        section: paper.section || "A",
        semester: paper.semester || "V",
        subjectCode: paper.subjectCode || "",
        subjectName: paper.subjectName || "",
        regulation: paper.regulation || "2021",
        duration: paper.duration || "Three Hours",
        date: paper.date || "",
        time: paper.time || "9:30 AM - 12:30 PM",
        maxMarks: paper.maxMarks || "100",
      });
      if (paper.partA) setPartA(paper.partA);
      if (paper.partB) setPartB(paper.partB);
      if (paper.partC) setPartC(paper.partC);
      setShowListModal(false);
      alert("Paper Loaded Successfully for Editing!");
    } catch (err) {
      alert("Error loading paper details");
    }
  };

  const deletePaper = async (id) => {
    if (window.confirm("Are you sure you want to delete this question paper?")) {
      try {
        await axios.delete(`http://localhost:5000/api/question-paper/delete/${id}`);
        alert("Question Paper Deleted Successfully!");
        const res = await axios.get("http://localhost:5000/api/question-paper/list");
        setSavedPapersList(res.data);
      } catch (err) {
        alert("Error deleting question paper");
      }
    }
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    if (name === "semester") {
      const newSubjects = subjectsBySemester[value] || [];
      setSubjectList(newSubjects);
      const defaultSub = newSubjects.length > 0 ? newSubjects[0] : { code: "", name: "" };
      setHeader({
        ...header,
        semester: value,
        subjectCode: defaultSub.code,
        subjectName: defaultSub.name,
      });
    } else {
      setHeader({ ...header, [name]: value });
    }
  };

  const handleSubjectChange = (e) => {
    const selectedCode = e.target.value;
    const foundSubject = subjectList.find((sub) => sub.code === selectedCode);
    setHeader({
      ...header,
      subjectCode: selectedCode,
      subjectName: foundSubject ? foundSubject.name : "",
    });
  };

  /* Part A Logic */
  const handlePartAChange = (index, value) => {
    const updated = [...partA];
    updated[index].question = value;
    const detected = autoDetectCOBLPI(value);
    updated[index].co = detected.co;
    updated[index].bl = detected.bl;
    updated[index].pi = detected.pi;
    setPartA(updated);
  };

  const handlePartAMetaChange = (index, field, value) => {
    const updated = [...partA];
    updated[index][field] = value;
    setPartA(updated);
  };

  const deletePartAQuestion = (index) => {
    const updated = partA.filter((_, i) => i !== index);
    const renumbered = updated.map((q, i) => ({ ...q, qNo: (i + 1).toString() }));
    setPartA(renumbered);
  };

  /* Part B Logic */
  const togglePartBType = (qIndex, optionKey, type) => {
    const updated = [...partB];
    if (optionKey === "A") updated[qIndex].typeA = type;
    else updated[qIndex].typeB = type;
    setPartB(updated);
  };

  const handlePartBSingleChange = (qIndex, optionKey, field, value) => {
    const updated = [...partB];
    const targetOpt = optionKey === "A" ? updated[qIndex].optionA : updated[qIndex].optionB;
    targetOpt[field] = value;
    if (field === "question") {
      const detected = autoDetectCOBLPI(value);
      targetOpt.co = detected.co;
      targetOpt.bl = detected.bl;
      targetOpt.pi = detected.pi;
    }
    setPartB(updated);
  };

  const deletePartBQuestion = (qIndex) => {
    const updated = partB.filter((_, i) => i !== qIndex);
    const renumbered = updated.map((q, i) => ({ ...q, qNo: (11 + i).toString() }));
    setPartB(renumbered);
  };

  const handlePartBSubChange = (qIndex, optionKey, subIndex, field, value) => {
    const updated = [...partB];
    const targetOpt = optionKey === "A" ? updated[qIndex].optionA : updated[qIndex].optionB;
    targetOpt.subQuestions[subIndex][field] = value;
    if (field === "question") {
      const detected = autoDetectCOBLPI(value);
      targetOpt.subQuestions[subIndex].co = detected.co;
      targetOpt.subQuestions[subIndex].bl = detected.bl;
      targetOpt.subQuestions[subIndex].pi = detected.pi;
    }
    setPartB(updated);
  };

  const deletePartBSub = (qIndex, optionKey, subIndex) => {
    const updated = [...partB];
    const targetOpt = optionKey === "A" ? updated[qIndex].optionA : updated[qIndex].optionB;
    targetOpt.subQuestions = targetOpt.subQuestions.filter((_, idx) => idx !== subIndex);
    setPartB(updated);
  };

  const addSubQuestion = (qIndex, optionKey) => {
    const updated = [...partB];
    const targetOpt = optionKey === "A" ? updated[qIndex].optionA : updated[qIndex].optionB;
    const labels = ["i)", "ii)", "iii)", "iv)"];
    const nextLabel = labels[targetOpt.subQuestions.length] || `${targetOpt.subQuestions.length + 1})`;
    targetOpt.subQuestions.push({ label: nextLabel, question: "", marks: "5", co: "", bl: "", pi: "" });
    setPartB(updated);
  };

  /* Part C Logic */
  const handlePartCChange = (optionKey, field, value) => {
    const targetOpt = optionKey === "A" ? partC.optionA : partC.optionB;
    const updatedOpt = { ...targetOpt, [field]: value };
    if (field === "question") {
      const detected = autoDetectCOBLPI(value);
      updatedOpt.co = detected.co;
      updatedOpt.bl = detected.bl;
      updatedOpt.pi = detected.pi;
    }
    if (optionKey === "A") {
      setPartC({ ...partC, optionA: updatedOpt });
    } else {
      setPartC({ ...partC, optionB: updatedOpt });
    }
  };

  const deletePartCQuestion = (optionKey) => {
    if (optionKey === "A") {
      setPartC({ ...partC, optionA: { ...partC.optionA, question: "", co: "", bl: "", pi: "" } });
    } else {
      setPartC({ ...partC, optionB: { ...partC.optionB, question: "", co: "", bl: "", pi: "" } });
    }
  };

  const saveOrUpdateQuestionPaper = async () => {
    try {
      const payload = { ...header, partA, partB, partC };
      if (editingId) {
        await axios.put(`http://localhost:5000/api/question-paper/update/${editingId}`, payload);
        alert("Question Paper Updated Successfully!");
      } else {
        await axios.post("http://localhost:5000/api/question-paper/save", payload);
        alert("Question Paper Saved Successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving/updating Question Paper");
    }
  };

  return (
    <div style={{ padding: "24px", fontFamily: "Segoe UI, Roboto, sans-serif", backgroundColor: "#f4f6f9", minHeight: "100vh", color: "#333" }}>
      
      {/* Light Border & Page Break Styles for Print */}
      <style>{`
        .light-table, .light-table th, .light-table td {
          border: 1px solid #cbd5e0 !important;
        }
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; padding: 0 !important; }
          #paper-sheet { border: none !important; box-shadow: none !important; width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
          input { border: none !important; background: transparent !important; }
          .page-break { page-break-after: always; display: block; }
          .light-table, .light-table th, .light-table td {
            border: 1px solid #718096 !important;
          }
        }
      `}</style>

      {/* CONTROLS PANEL */}
      <div className="no-print" style={{ background: "#ffffff", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", border: "1px solid #e1e4e8", maxWidth: "650px", margin: "0 auto 30px auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #f0f2f5", paddingBottom: "12px", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, fontSize: "20px", color: "#1a202c" }}>Question Paper Builder</h2>
          <button style={{ padding: "6px 12px", background: "#0bc5ea", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }} onClick={fetchSavedPapers}>
            📂 Load / Edit Saved Paper
          </button>
        </div>

        {editingId && (
          <div style={{ background: "#fff3cd", color: "#856404", padding: "8px 12px", borderRadius: "6px", marginBottom: "16px", fontSize: "13px", fontWeight: "600", borderLeft: "4px solid #ffeba2" }}>
            ⚠️ Editing Existing Paper Mode (ID: {editingId})
          </div>
        )}

        <h3 style={{ marginBottom: "15px", fontSize: "16px" }}>1. Header Details</h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Exam Name:</label>
            <select 
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} 
              name="examName" 
              value={header.examName} 
              onChange={handleHeaderChange}
            >
              <option value="I CIA TEST">I CIA TEST</option>
              <option value="II CIA TEST">II CIA TEST</option>
              <option value="MODEL TEST">MODEL TEST</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Month & Year:</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <select style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} name="examMonth" value={header.examMonth} onChange={handleHeaderChange}>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} name="examYear" value={header.examYear} onChange={handleHeaderChange}>
                {["2024", "2025", "2026", "2027", "2028", "2029", "2030"].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Branch / Department:</label>
              <input style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} type="text" name="branch" value={header.branch} onChange={handleHeaderChange} />
            </div>
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Section:</label>
              <select style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} name="section" value={header.section} onChange={handleHeaderChange}>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Semester:</label>
            <select style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} name="semester" value={header.semester} onChange={handleHeaderChange}>
              {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Subject Code & Name:</label>
            <select style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} value={header.subjectCode} onChange={handleSubjectChange}>
              {subjectList.map((sub) => (
                <option key={sub.code} value={sub.code}>
                  {sub.code} - {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Exam Date:</label>
            <input style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} type="date" name="date" value={header.date} onChange={handleHeaderChange} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Exam Time:</label>
            <select style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} name="time" value={header.time} onChange={handleHeaderChange}>
              <option value="9:30 AM - 12:30 PM">9:30 AM - 12:30 PM</option>
              <option value="1:00 PM - 4:00 PM">1:00 PM - 4:00 PM</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ flex: 1, padding: "10px", background: editingId ? "#dd6b20" : "#38a169", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }} onClick={saveOrUpdateQuestionPaper}>
            {editingId ? "Update Question Paper" : "Save Question Paper"}
          </button>
          <button style={{ flex: 1, padding: "10px", background: "#3182ce", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }} onClick={() => window.print()}>
            🖨️ Print / Save as PDF
          </button>
        </div>
      </div>

      {/* MODAL FOR SAVED PAPERS LIST */}
      {showListModal && (
        <div className="no-print" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", maxWidth: "550px", width: "90%", maxHeight: "80vh", overflowY: "auto" }}>
            <h3 style={{ marginTop: 0 }}>Select Saved Question Paper to Edit</h3>
            {savedPapersList.length === 0 ? (
              <p>No saved papers found.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {savedPapersList.map((paper) => (
                  <div key={paper._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderBottom: "1px solid #edf2f7" }}>
                    <div>
                      <strong>{paper.subjectCode} - {paper.subjectName}</strong>
                      <div style={{ fontSize: "12px", color: "#666" }}>{paper.examName} | {paper.date}</div>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button style={{ padding: "4px 8px", background: "#3182ce", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={() => loadPaperForEdit(paper._id)}>Edit ✏️</button>
                      <button style={{ padding: "4px 8px", background: "#e53e3e", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={() => deletePaper(paper._id)}>Delete 🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button style={{ marginTop: "15px", padding: "8px 16px", background: "#718096", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }} onClick={() => setShowListModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* PRINTABLE QUESTION PAPER SHEET */}
      <div id="paper-sheet" style={{ background: "#ffffff", padding: "40px", border: "1px solid #d2d6dc", maxWidth: "850px", margin: "0 auto", borderRadius: "4px" }}>
        
        {/* PAGE 1: HEADER & PART A */}
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ fontWeight: "bold", fontSize: "12px" }}>Register No.</span>
              <div style={{ display: "flex" }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ width: "16px", height: "20px", border: "1px solid #cbd5e0", borderLeft: i !== 0 ? "none" : "1px solid #cbd5e0" }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Header Title */}
          <div style={{ textAlign: "center", textTransform: "uppercase", fontWeight: "bold", fontSize: "13px", lineHeight: "1.4" }}>
            <div>{header.collegeName}</div>
            <div>{header.examName} - {header.examMonth} {header.examYear}</div>
            <div>{header.branch} {header.section ? ` - SEC ${header.section}` : ''}</div>
            <div>{header.semester}- SEMESTER</div>
            <div>{header.subjectCode} - {header.subjectName}</div>
            <div style={{ fontSize: "11px", fontWeight: "normal" }}>(Regulation {header.regulation})</div>
          </div>

          <div style={{ 
            marginTop: "15px", 
            marginBottom: "12px", 
            fontSize: "12px", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "flex-start",
            width: "100%" 
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2px 8px", lineHeight: "1.8" }}>
              <span style={{ fontWeight: "bold" }}>Duration:</span>
              <span>{header.duration}</span>
              <span style={{ fontWeight: "bold" }}>Date:</span>
              <span>{formatDateDDMMYYYY(header.date)}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2px 8px", lineHeight: "1.8" }}>
              <span style={{ fontWeight: "bold" }}>Max. Marks:</span>
              <span>{header.maxMarks}</span>
              <span style={{ fontWeight: "bold" }}>Time:</span>
              <span>{header.time}</span>
            </div>
          </div>

          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", marginBottom: "10px" }}>Answer ALL Questions</div>

          {/* PART A */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
              <div style={{ fontWeight: "bold", fontSize: "12px" }}>PART – A (10 x 2 = 20 Marks)</div>
            </div>
            
            <table className="light-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <thead>
                <tr style={{ background: "#f7fafc" }}>
                  <th style={{ width: "35px", padding: "6px" }}>Q.No</th>
                  <th style={{ padding: "6px" }}>Questions</th>
                  <th style={{ width: "50px", padding: "6px" }}>CO</th>
                  <th style={{ width: "40px", padding: "6px" }}>BL</th>
                  <th style={{ width: "50px", padding: "6px" }}>PI</th>
                </tr>
              </thead>
              <tbody>
                {partA.map((q, idx) => (
                  <tr key={idx}>
                    <td align="center" style={{ padding: "6px" }}><b>{q.qNo}.</b></td>
                    <td style={{ padding: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="text"
                          style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                          value={q.question}
                          onChange={(e) => handlePartAChange(idx, e.target.value)}
                          placeholder={`Enter Short Question ${idx + 1}`}
                        />
                        <button className="no-print" onClick={() => deletePartAQuestion(idx)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer" }} title="Delete Question">🗑️</button>
                      </div>
                    </td>
                    <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={q.co} onChange={(e) => handlePartAMetaChange(idx, "co", e.target.value)} /></td>
                    <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={q.bl} onChange={(e) => handlePartAMetaChange(idx, "bl", e.target.value)} /></td>
                    <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={q.pi} onChange={(e) => handlePartAMetaChange(idx, "pi", e.target.value)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGE BREAK TO PAGE 2 FOR PART B */}
        <div className="page-break" style={{ marginTop: "20px" }}></div>

        {/* PART B (Add Button Removed, Editable Marks, Blue Colored Option Buttons) */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
            <div style={{ fontWeight: "bold", fontSize: "12px" }}>PART – B (5 x 13 = 65 Marks)</div>
          </div>

          <table className="light-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ background: "#f7fafc" }}>
                <th style={{ width: "60px", padding: "6px" }}>Q.No</th>
                <th style={{ padding: "6px" }}>Questions</th>
                <th style={{ width: "45px", padding: "6px" }}>Marks</th>
                <th style={{ width: "50px", padding: "6px" }}>CO</th>
                <th style={{ width: "40px", padding: "6px" }}>BL</th>
                <th style={{ width: "50px", padding: "6px" }}>PI</th>
              </tr>
            </thead>
            <tbody>
              {partB.map((qItem, qIdx) => (
                <React.Fragment key={qIdx}>
                  {/* Option A Configuration Row */}
                  <tr className="no-print" style={{ background: "#edf2f7" }}>
                    <td colSpan="6" style={{ padding: "4px 8px", fontSize: "11px" }}>
                      <b>Q{qItem.qNo} Option A Type:</b>{" "}
                      <button style={{ padding: "2px 6px", fontSize: "11px", color: "#3182ce", cursor: "pointer", fontWeight: qItem.typeA === "single" ? "bold" : "normal" }} onClick={() => togglePartBType(qIdx, "A", "single")}>Single Qn</button>{" "}
                      <button style={{ padding: "2px 6px", fontSize: "11px", color: "#3182ce", cursor: "pointer", fontWeight: qItem.typeA === "sub" ? "bold" : "normal" }} onClick={() => togglePartBType(qIdx, "A", "sub")}>Sub Qns (i, ii)</button>
                      {qItem.typeA === "sub" && <button style={{ marginLeft: "10px", padding: "2px 6px", background: "#38a169", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer", fontWeight: "600" }} onClick={() => addSubQuestion(qIdx, "A")}>+ Add Sub Qn</button>}
                      <button onClick={() => deletePartBQuestion(qIdx)} style={{ float: "right", background: "#e53e3e", color: "#fff", border: "none", borderRadius: "3px", padding: "2px 6px", cursor: "pointer" }}>Delete Q{qItem.qNo}</button>
                    </td>
                  </tr>

                  {qItem.typeA === "single" ? (
                    <tr>
                      <td align="center" style={{ padding: "6px" }}><b>{qItem.qNo}. a)</b></td>
                      <td style={{ padding: "6px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type="text"
                            style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                            value={qItem.optionA.question}
                            onChange={(e) => handlePartBSingleChange(qIdx, "A", "question", e.target.value)}
                            placeholder={`Enter Question ${qItem.qNo}. a)`}
                          />
                        </div>
                      </td>
                      <td align="center" style={{ padding: "6px" }}>
                        (<input style={{ width: "22px", border: "none", outline: "none", background: "transparent", textAlign: "center", fontSize: "12px" }} type="text" value={qItem.optionA.marks} onChange={(e) => handlePartBSingleChange(qIdx, "A", "marks", e.target.value)} />)
                      </td>
                      <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={qItem.optionA.co} onChange={(e) => handlePartBSingleChange(qIdx, "A", "co", e.target.value)} /></td>
                      <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={qItem.optionA.bl} onChange={(e) => handlePartBSingleChange(qIdx, "A", "bl", e.target.value)} /></td>
                      <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={qItem.optionA.pi} onChange={(e) => handlePartBSingleChange(qIdx, "A", "pi", e.target.value)} /></td>
                    </tr>
                  ) : (
                    qItem.optionA.subQuestions.map((sub, sIdx) => (
                      <tr key={sIdx}>
                        <td align="center" style={{ padding: "6px" }}><b>{sIdx === 0 ? `${qItem.qNo}. a) ${sub.label}` : `${sub.label}`}</b></td>
                        <td style={{ padding: "6px" }}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                              type="text"
                              style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                              value={sub.question}
                              onChange={(e) => handlePartBSubChange(qIdx, "A", sIdx, "question", e.target.value)}
                              placeholder={`Enter Sub-question ${sub.label}`}
                            />
                            <button className="no-print" onClick={() => deletePartBSub(qIdx, "A", sIdx)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer" }} title="Delete Sub-Question">🗑️</button>
                          </div>
                        </td>
                        <td align="center" style={{ padding: "6px" }}>
                          (<input style={{ width: "22px", border: "none", outline: "none", background: "transparent", textAlign: "center", fontSize: "12px" }} type="text" value={sub.marks} onChange={(e) => handlePartBSubChange(qIdx, "A", sIdx, "marks", e.target.value)} />)
                        </td>
                        <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={sub.co} onChange={(e) => handlePartBSubChange(qIdx, "A", sIdx, "co", e.target.value)} /></td>
                        <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={sub.bl} onChange={(e) => handlePartBSubChange(qIdx, "A", sIdx, "bl", e.target.value)} /></td>
                        <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={sub.pi} onChange={(e) => handlePartBSubChange(qIdx, "A", sIdx, "pi", e.target.value)} /></td>
                      </tr>
                    ))
                  )}

                  {/* OR Row */}
                  <tr>
                    <td colSpan="6" align="center" style={{ fontWeight: "bold", padding: "4px" }}>OR</td>
                  </tr>

                  {/* Option B Configuration Row */}
                  <tr className="no-print" style={{ background: "#edf2f7" }}>
                    <td colSpan="6" style={{ padding: "4px 8px", fontSize: "11px" }}>
                      <b>Q{qItem.qNo} Option B Type:</b>{" "}
                      <button style={{ padding: "2px 6px", fontSize: "11px", color: "#3182ce", cursor: "pointer", fontWeight: qItem.typeB === "single" ? "bold" : "normal" }} onClick={() => togglePartBType(qIdx, "B", "single")}>Single Qn</button>{" "}
                      <button style={{ padding: "2px 6px", fontSize: "11px", color: "#3182ce", cursor: "pointer", fontWeight: qItem.typeB === "sub" ? "bold" : "normal" }} onClick={() => togglePartBType(qIdx, "B", "sub")}>Sub Qns (i, ii)</button>
                      {qItem.typeB === "sub" && <button style={{ marginLeft: "10px", padding: "2px 6px", background: "#38a169", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer", fontWeight: "600" }} onClick={() => addSubQuestion(qIdx, "B")}>+ Add Sub Qn</button>}
                    </td>
                  </tr>

                  {qItem.typeB === "single" ? (
                    <tr>
                      <td align="center" style={{ padding: "6px" }}><b>b)</b></td>
                      <td style={{ padding: "6px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type="text"
                            style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                            value={qItem.optionB.question}
                            onChange={(e) => handlePartBSingleChange(qIdx, "B", "question", e.target.value)}
                            placeholder={`Enter Question ${qItem.qNo}. b)`}
                          />
                        </div>
                      </td>
                      <td align="center" style={{ padding: "6px" }}>
                        (<input style={{ width: "22px", border: "none", outline: "none", background: "transparent", textAlign: "center", fontSize: "12px" }} type="text" value={qItem.optionB.marks} onChange={(e) => handlePartBSingleChange(qIdx, "B", "marks", e.target.value)} />)
                      </td>
                      <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={qItem.optionB.co} onChange={(e) => handlePartBSingleChange(qIdx, "B", "co", e.target.value)} /></td>
                      <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={qItem.optionB.bl} onChange={(e) => handlePartBSingleChange(qIdx, "B", "bl", e.target.value)} /></td>
                      <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={qItem.optionB.pi} onChange={(e) => handlePartBSingleChange(qIdx, "B", "pi", e.target.value)} /></td>
                    </tr>
                  ) : (
                    qItem.optionB.subQuestions.map((sub, sIdx) => (
                      <tr key={sIdx}>
                        <td align="center" style={{ padding: "6px" }}><b>{sIdx === 0 ? `b) ${sub.label}` : `${sub.label}`}</b></td>
                        <td style={{ padding: "6px" }}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                              type="text"
                              style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                              value={sub.question}
                              onChange={(e) => handlePartBSubChange(qIdx, "B", sIdx, "question", e.target.value)}
                              placeholder={`Enter Sub-question ${sub.label}`}
                            />
                            <button className="no-print" onClick={() => deletePartBSub(qIdx, "B", sIdx)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer" }} title="Delete Sub-Question">🗑️</button>
                          </div>
                        </td>
                        <td align="center" style={{ padding: "6px" }}>
                          (<input style={{ width: "22px", border: "none", outline: "none", background: "transparent", textAlign: "center", fontSize: "12px" }} type="text" value={sub.marks} onChange={(e) => handlePartBSubChange(qIdx, "B", sIdx, "marks", e.target.value)} />)
                        </td>
                        <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={sub.co} onChange={(e) => handlePartBSubChange(qIdx, "B", sIdx, "co", e.target.value)} /></td>
                        <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={sub.bl} onChange={(e) => handlePartBSubChange(qIdx, "B", sIdx, "bl", e.target.value)} /></td>
                        <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={sub.pi} onChange={(e) => handlePartBSubChange(qIdx, "B", sIdx, "pi", e.target.value)} /></td>
                      </tr>
                    ))
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGE BREAK TO PAGE 3 FOR PART C */}
        <div className="page-break" style={{ marginTop: "20px" }}></div>

        {/* PART C */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", marginBottom: "5px" }}>PART – C (1 x 15 = 15 Marks)</div>
          <table className="light-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ background: "#f7fafc" }}>
                <th style={{ width: "60px", padding: "6px" }}>Q.No</th>
                <th style={{ padding: "6px" }}>Questions</th>
                <th style={{ width: "45px", padding: "6px" }}>Marks</th>
                <th style={{ width: "50px", padding: "6px" }}>CO</th>
                <th style={{ width: "40px", padding: "6px" }}>BL</th>
                <th style={{ width: "50px", padding: "6px" }}>PI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td align="center" style={{ padding: "6px" }}><b>{partC.qNo}. a)</b></td>
                <td style={{ padding: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="text"
                      style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                      value={partC.optionA.question}
                      onChange={(e) => handlePartCChange("A", "question", e.target.value)}
                      placeholder="Enter Part C Question 16. a)"
                    />
                    <button className="no-print" onClick={() => deletePartCQuestion("A")} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer" }} title="Delete Question">🗑️</button>
                  </div>
                </td>
                <td align="center" style={{ padding: "6px" }}>(15)</td>
                <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={partC.optionA.co} onChange={(e) => handlePartCChange("A", "co", e.target.value)} /></td>
                <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={partC.optionA.bl} onChange={(e) => handlePartCChange("A", "bl", e.target.value)} /></td>
                <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={partC.optionA.pi} onChange={(e) => handlePartCChange("A", "pi", e.target.value)} /></td>
              </tr>
              <tr>
                <td colSpan="6" align="center" style={{ fontWeight: "bold", padding: "4px" }}>OR</td>
              </tr>
              <tr>
                <td align="center" style={{ padding: "6px" }}><b>b)</b></td>
                <td style={{ padding: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="text"
                      style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                      value={partC.optionB.question}
                      onChange={(e) => handlePartCChange("B", "question", e.target.value)}
                      placeholder="Enter Part C Question 16. b)"
                    />
                    <button className="no-print" onClick={() => deletePartCQuestion("B")} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer" }} title="Delete Question">🗑️</button>
                  </div>
                </td>
                <td align="center" style={{ padding: "6px" }}>(15)</td>
                <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={partC.optionB.co} onChange={(e) => handlePartCChange("B", "co", e.target.value)} /></td>
                <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={partC.optionB.bl} onChange={(e) => handlePartCChange("B", "bl", e.target.value)} /></td>
                <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none" }} type="text" value={partC.optionB.pi} onChange={(e) => handlePartCChange("B", "pi", e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}