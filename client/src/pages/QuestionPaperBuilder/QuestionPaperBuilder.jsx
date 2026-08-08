import React, { useState, useEffect } from "react";
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

function QuestionPaperBuilder() {
  const [editingId, setEditingId] = useState(null); // Tracks if currently editing saved paper
  const [savedPapersList, setSavedPapersList] = useState([]);
  const [showListModal, setShowListModal] = useState(false);

  const [header, setHeader] = useState({
    collegeName: "A.V.C. College Of Engineering , Mannampandal",
    examName: "I CIA",
    examMonth: "AUG",
    examYear: "2026",
    branch: "B.TECH - INFORMATION TECHNOLOGY",
    semester: "V",
    subjectCode: "CS8591",
    subjectName: "Computer Networks",
    regulation: "2021",
    duration: "Three Hours",
    date: "2026-08-11",
    time: "9:30 AM - 12:30 PM",
    maxMarks: "100",
  });

  const subjectList = [
    { code: "CS8591", name: "Computer Networks" },
    { code: "IT8501", name: "Web Technology" },
    { code: "CS8491", name: "Computer Architecture" },
    { code: "CS8592", name: "Object Oriented Analysis and Design" },
    { code: "MA8551", name: "Algebra and Number Theory" },
  ];

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

  // Fetch list of saved question papers
  const fetchSavedPapers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/question-paper/list");
      setSavedPapersList(res.data);
      setShowListModal(true);
    } catch (err) {
      alert("Error fetching saved papers list");
    }
  };

  // Load selected paper for editing
  const loadPaperForEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/question-paper/${id}`);
      const paper = res.data;
      setEditingId(paper._id);
      setHeader({
        collegeName: paper.collegeName,
        examName: paper.examName,
        examMonth: paper.examMonth,
        examYear: paper.examYear,
        branch: paper.branch,
        semester: paper.semester,
        subjectCode: paper.subjectCode,
        subjectName: paper.subjectName,
        regulation: paper.regulation,
        duration: paper.duration,
        date: paper.date,
        time: paper.time,
        maxMarks: paper.maxMarks,
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

  const handleHeaderChange = (e) => {
    setHeader({ ...header, [e.target.name]: e.target.value });
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

  // --- PART A Handlers ---
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
    const updated = [...partA];
    updated[index].question = "";
    updated[index].co = "";
    updated[index].bl = "";
    updated[index].pi = "";
    setPartA(updated);
  };

  // --- PART B Handlers ---
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

  const deletePartBSingle = (qIndex, optionKey) => {
    const updated = [...partB];
    const targetOpt = optionKey === "A" ? updated[qIndex].optionA : updated[qIndex].optionB;
    targetOpt.question = "";
    targetOpt.co = "";
    targetOpt.bl = "";
    targetOpt.pi = "";
    setPartB(updated);
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
    targetOpt.subQuestions[subIndex].question = "";
    targetOpt.subQuestions[subIndex].co = "";
    targetOpt.subQuestions[subIndex].bl = "";
    targetOpt.subQuestions[subIndex].pi = "";
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

  // --- PART C Handlers ---
  const handlePartCChange = (optionKey, field, value) => {
    const updated = { ...partC };
    updated[optionKey][field] = value;
    if (field === "question") {
      const detected = autoDetectCOBLPI(value);
      updated[optionKey].co = detected.co;
      updated[optionKey].bl = detected.bl;
      updated[optionKey].pi = detected.pi;
    }
    setPartC(updated);
  };

  const deletePartCQuestion = (optionKey) => {
    const updated = { ...partC };
    updated[optionKey].question = "";
    updated[optionKey].co = "";
    updated[optionKey].bl = "";
    updated[optionKey].pi = "";
    setPartC(updated);
  };

  // Save or Update Paper
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* CONTROLS HEADER */}
      <div className="no-print" style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #ddd", maxWidth: "600px", margin: "0 auto 20px auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Question Paper Builder</h2>
          <button onClick={fetchSavedPapers} style={{ padding: "8px 12px", background: "#17a2b8", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            📂 Load / Edit Saved Paper
          </button>
        </div>

        {editingId && (
          <div style={{ background: "#fff3cd", color: "#856404", padding: "8px", borderRadius: "4px", marginTop: "10px", fontSize: "12px", fontWeight: "bold" }}>
            ⚠️ Editing Existing Paper Mode (ID: {editingId})
          </div>
        )}

        <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>1. Header Details</h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Exam Name:</label>
            <select name="examName" value={header.examName} onChange={handleHeaderChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
              <option value="I CIA">I CIA</option>
              <option value="II CIA">II CIA</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Month & Year:</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <select name="examMonth" value={header.examMonth} onChange={handleHeaderChange} style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
                {["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select name="examYear" value={header.examYear} onChange={handleHeaderChange} style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
                {["2024", "2025", "2026", "2027", "2028", "2029", "2030"].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Semester:</label>
            <select name="semester" value={header.semester} onChange={handleHeaderChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
              {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Subject Code & Name:</label>
            <select value={header.subjectCode} onChange={handleSubjectChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
              {subjectList.map((sub) => (
                <option key={sub.code} value={sub.code}>
                  {sub.code} - {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Exam Date:</label>
            <input type="date" name="date" value={header.date} onChange={handleHeaderChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ fontSize: "12px", fontWeight: "bold" }}>Exam Time:</label>
            <select name="time" value={header.time} onChange={handleHeaderChange} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}>
              <option value="9:30 AM - 12:30 PM">9:30 AM - 12:30 PM</option>
              <option value="1:00 PM - 4:00 PM">1:00 PM - 4:00 PM</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={saveOrUpdateQuestionPaper} style={{ flex: 1, padding: "10px", background: editingId ? "#ffc107" : "#28a745", color: editingId ? "#000" : "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            {editingId ? "Update Question Paper" : "Save Question Paper"}
          </button>
          <button onClick={() => window.print()} style={{ flex: 1, padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* MODAL FOR SAVED PAPERS LIST */}
      {showListModal && (
        <div className="no-print" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", maxWidth: "500px", width: "90%", maxHeight: "80vh", overflowY: "auto" }}>
            <h3>Select Saved Question Paper to Edit</h3>
            {savedPapersList.length === 0 ? (
              <p>No saved papers found.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {savedPapersList.map((paper) => (
                  <li key={paper._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ddd" }}>
                    <div>
                      <strong>{paper.subjectCode} - {paper.subjectName}</strong>
                      <div style={{ fontSize: "12px", color: "#666" }}>{paper.examName} | {paper.date}</div>
                    </div>
                    <button onClick={() => loadPaperForEdit(paper._id)} style={{ padding: "6px 12px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                      Edit ✏️
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setShowListModal(false)} style={{ marginTop: "15px", padding: "8px 16px", background: "#6c757d", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* PRINTABLE SHEET */}
      <div id="paper-sheet" style={{ background: "white", padding: "30px", border: "1px solid #000", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ fontWeight: "bold", fontSize: "12px" }}>Register No.</span>
            <div style={{ display: "flex" }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{ width: "16px", height: "20px", border: "1px solid #000", borderLeft: i !== 0 ? "none" : "1px solid #000" }}></div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", textTransform: "uppercase", fontWeight: "bold", fontSize: "13px", lineHeight: "1.4" }}>
          <div>{header.collegeName}</div>
          <div>{header.examName} EXAMINATION - {header.examMonth} {header.examYear}</div>
          <div>{header.branch}</div>
          <div>{header.semester}- SEMESTER</div>
          <div>{header.subjectCode} - {header.subjectName}</div>
          <div style={{ fontSize: "11px", fontWeight: "normal" }}>(Regulation {header.regulation})</div>
        </div>

        <div style={{ marginTop: "15px", marginBottom: "12px", fontSize: "12px", display: "flex", justifyContent: "space-between" }}>
          <div style={{ textAlign: "left", lineHeight: "1.8" }}>
            <div><b>Duration:</b> {header.duration}</div>
            <div><b>Date:</b> {formatDateDDMMYYYY(header.date)}</div>
          </div>
          <div style={{ textAlign: "right", lineHeight: "1.8" }}>
            <div><b>Max. Marks:</b> {header.maxMarks}</div>
            <div><b>Time:</b> {header.time}</div>
          </div>
        </div>

        <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", marginBottom: "10px" }}>Answer ALL Questions</div>

        {/* PART A */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", marginBottom: "5px" }}>PART – A (10 x 2 = 20 Marks)</div>
          <table border="1" cellPadding="3" style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ background: "#f0f0f0" }}>
                <th style={{ width: "35px" }}>Q.No</th>
                <th>Questions</th>
                <th style={{ width: "50px" }}>CO</th>
                <th style={{ width: "40px" }}>BL</th>
                <th style={{ width: "50px" }}>PI</th>
              </tr>
            </thead>
            <tbody>
              {partA.map((q, idx) => (
                <tr key={idx}>
                  <td align="center"><b>{q.qNo}.</b></td>
                  <td style={{ display: "flex", alignItems: "center", border: "none" }}>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => handlePartAChange(idx, e.target.value)}
                      placeholder={`Enter Short Question ${idx + 1}`}
                      style={{ flex: 1, border: "none", outline: "none", padding: "4px" }}
                    />
                    <button className="no-print" onClick={() => deletePartAQuestion(idx)} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }} title="Delete Question">🗑️</button>
                  </td>
                  <td><input type="text" value={q.co} onChange={(e) => handlePartAMetaChange(idx, "co", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                  <td><input type="text" value={q.bl} onChange={(e) => handlePartAMetaChange(idx, "bl", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                  <td><input type="text" value={q.pi} onChange={(e) => handlePartAMetaChange(idx, "pi", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PART B */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", marginBottom: "5px" }}>PART – B (5 x 13 = 65 Marks)</div>
          <table border="1" cellPadding="3" style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ background: "#f0f0f0" }}>
                <th style={{ width: "60px" }}>Q.No</th>
                <th>Questions</th>
                <th style={{ width: "45px" }}>Marks</th>
                <th style={{ width: "50px" }}>CO</th>
                <th style={{ width: "40px" }}>BL</th>
                <th style={{ width: "50px" }}>PI</th>
              </tr>
            </thead>
            <tbody>
              {partB.map((qItem, qIdx) => (
                <React.Fragment key={qIdx}>
                  <tr className="no-print" style={{ background: "#eef2f5" }}>
                    <td colSpan="6" style={{ padding: "4px 8px", fontSize: "11px" }}>
                      <b>Q{qItem.qNo} Option A Type:</b>{" "}
                      <button onClick={() => togglePartBType(qIdx, "A", "single")} style={{ fontWeight: qItem.typeA === "single" ? "bold" : "normal" }}>Single Qn</button>{" "}
                      <button onClick={() => togglePartBType(qIdx, "A", "sub")} style={{ fontWeight: qItem.typeA === "sub" ? "bold" : "normal" }}>Sub Qns (i, ii)</button>
                      {qItem.typeA === "sub" && <button onClick={() => addSubQuestion(qIdx, "A")} style={{ marginLeft: "10px" }}>+ Add Sub Qn</button>}
                    </td>
                  </tr>

                  {qItem.typeA === "single" ? (
                    <tr>
                      <td align="center"><b>{qItem.qNo}. a)</b></td>
                      <td style={{ display: "flex", alignItems: "center", border: "none" }}>
                        <input
                          type="text"
                          value={qItem.optionA.question}
                          onChange={(e) => handlePartBSingleChange(qIdx, "A", "question", e.target.value)}
                          placeholder={`Enter Question ${qItem.qNo}. a)`}
                          style={{ flex: 1, border: "none", outline: "none" }}
                        />
                        <button className="no-print" onClick={() => deletePartBSingle(qIdx, "A")} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }} title="Delete Question">🗑️</button>
                      </td>
                      <td align="center">(13)</td>
                      <td><input type="text" value={qItem.optionA.co} onChange={(e) => handlePartBSingleChange(qIdx, "A", "co", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                      <td><input type="text" value={qItem.optionA.bl} onChange={(e) => handlePartBSingleChange(qIdx, "A", "bl", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                      <td><input type="text" value={qItem.optionA.pi} onChange={(e) => handlePartBSingleChange(qIdx, "A", "pi", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                    </tr>
                  ) : (
                    qItem.optionA.subQuestions.map((sub, sIdx) => (
                      <tr key={sIdx}>
                        <td align="center"><b>{sIdx === 0 ? `${qItem.qNo}. a) ${sub.label}` : `${sub.label}`}</b></td>
                        <td style={{ display: "flex", alignItems: "center", border: "none" }}>
                          <input
                            type="text"
                            value={sub.question}
                            onChange={(e) => handlePartBSubChange(qIdx, "A", sIdx, "question", e.target.value)}
                            placeholder={`Enter Sub-question ${sub.label}`}
                            style={{ flex: 1, border: "none", outline: "none" }}
                          />
                          <button className="no-print" onClick={() => deletePartBSub(qIdx, "A", sIdx)} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }} title="Delete Sub-Question">🗑️</button>
                        </td>
                        <td align="center">
                          <input type="text" value={sub.marks} onChange={(e) => handlePartBSubChange(qIdx, "A", sIdx, "marks", e.target.value)} style={{ width: "25px", border: "none", textAlign: "center" }} />
                        </td>
                        <td><input type="text" value={sub.co} onChange={(e) => handlePartBSubChange(qIdx, "A", sIdx, "co", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                        <td><input type="text" value={sub.bl} onChange={(e) => handlePartBSubChange(qIdx, "A", sIdx, "bl", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                        <td><input type="text" value={sub.pi} onChange={(e) => handlePartBSubChange(qIdx, "A", sIdx, "pi", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                      </tr>
                    ))
                  )}

                  <tr><td colSpan="6" align="center" style={{ fontWeight: "bold", background: "#fcfcfc" }}>Or</td></tr>

                  <tr className="no-print" style={{ background: "#eef2f5" }}>
                    <td colSpan="6" style={{ padding: "4px 8px", fontSize: "11px" }}>
                      <b>Q{qItem.qNo} Option B Type:</b>{" "}
                      <button onClick={() => togglePartBType(qIdx, "B", "single")} style={{ fontWeight: qItem.typeB === "single" ? "bold" : "normal" }}>Single Qn</button>{" "}
                      <button onClick={() => togglePartBType(qIdx, "B", "sub")} style={{ fontWeight: qItem.typeB === "sub" ? "bold" : "normal" }}>Sub Qns (i, ii)</button>
                      {qItem.typeB === "sub" && <button onClick={() => addSubQuestion(qIdx, "B")} style={{ marginLeft: "10px" }}>+ Add Sub Qn</button>}
                    </td>
                  </tr>

                  {qItem.typeB === "single" ? (
                    <tr>
                      <td align="center"><b>{qItem.qNo}. b)</b></td>
                      <td style={{ display: "flex", alignItems: "center", border: "none" }}>
                        <input
                          type="text"
                          value={qItem.optionB.question}
                          onChange={(e) => handlePartBSingleChange(qIdx, "B", "question", e.target.value)}
                          placeholder={`Enter Question ${qItem.qNo}. b)`}
                          style={{ flex: 1, border: "none", outline: "none" }}
                        />
                        <button className="no-print" onClick={() => deletePartBSingle(qIdx, "B")} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }} title="Delete Question">🗑️</button>
                      </td>
                      <td align="center">(13)</td>
                      <td><input type="text" value={qItem.optionB.co} onChange={(e) => handlePartBSingleChange(qIdx, "B", "co", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                      <td><input type="text" value={qItem.optionB.bl} onChange={(e) => handlePartBSingleChange(qIdx, "B", "bl", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                      <td><input type="text" value={qItem.optionB.pi} onChange={(e) => handlePartBSingleChange(qIdx, "B", "pi", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                    </tr>
                  ) : (
                    qItem.optionB.subQuestions.map((sub, sIdx) => (
                      <tr key={sIdx}>
                        <td align="center"><b>{sIdx === 0 ? `${qItem.qNo}. b) ${sub.label}` : `${sub.label}`}</b></td>
                        <td style={{ display: "flex", alignItems: "center", border: "none" }}>
                          <input
                            type="text"
                            value={sub.question}
                            onChange={(e) => handlePartBSubChange(qIdx, "B", sIdx, "question", e.target.value)}
                            placeholder={`Enter Sub-question ${sub.label}`}
                            style={{ flex: 1, border: "none", outline: "none" }}
                          />
                          <button className="no-print" onClick={() => deletePartBSub(qIdx, "B", sIdx)} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }} title="Delete Sub-Question">🗑️</button>
                        </td>
                        <td align="center">
                          <input type="text" value={sub.marks} onChange={(e) => handlePartBSubChange(qIdx, "B", sIdx, "marks", e.target.value)} style={{ width: "25px", border: "none", textAlign: "center" }} />
                        </td>
                        <td><input type="text" value={sub.co} onChange={(e) => handlePartBSubChange(qIdx, "B", sIdx, "co", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                        <td><input type="text" value={sub.bl} onChange={(e) => handlePartBSubChange(qIdx, "B", sIdx, "bl", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                        <td><input type="text" value={sub.pi} onChange={(e) => handlePartBSubChange(qIdx, "B", sIdx, "pi", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                      </tr>
                    ))
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* PART C */}
        <div>
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", marginBottom: "5px" }}>PART – C (1 x 15 = 15 Marks)</div>
          <table border="1" cellPadding="3" style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ background: "#f0f0f0" }}>
                <th style={{ width: "60px" }}>Q.No</th>
                <th>Questions</th>
                <th style={{ width: "45px" }}>Marks</th>
                <th style={{ width: "50px" }}>CO</th>
                <th style={{ width: "40px" }}>BL</th>
                <th style={{ width: "50px" }}>PI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td align="center"><b>16. a)</b></td>
                <td style={{ display: "flex", alignItems: "center", border: "none" }}>
                  <input
                    type="text"
                    value={partC.optionA.question}
                    onChange={(e) => handlePartCChange("optionA", "question", e.target.value)}
                    placeholder="Enter Question 16. a)"
                    style={{ flex: 1, border: "none", outline: "none" }}
                  />
                  <button className="no-print" onClick={() => deletePartCQuestion("optionA")} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }} title="Delete Question">🗑️</button>
                </td>
                <td align="center">(15)</td>
                <td><input type="text" value={partC.optionA.co} onChange={(e) => handlePartCChange("optionA", "co", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                <td><input type="text" value={partC.optionA.bl} onChange={(e) => handlePartCChange("optionA", "bl", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                <td><input type="text" value={partC.optionA.pi} onChange={(e) => handlePartCChange("optionA", "pi", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
              </tr>
              <tr>
                <td colSpan="6" align="center" style={{ fontWeight: "bold", background: "#fcfcfc" }}>Or</td>
              </tr>
              <tr>
                <td align="center"><b>16. b)</b></td>
                <td style={{ display: "flex", alignItems: "center", border: "none" }}>
                  <input
                    type="text"
                    value={partC.optionB.question}
                    onChange={(e) => handlePartCChange("optionB", "question", e.target.value)}
                    placeholder="Enter Question 16. b)"
                    style={{ flex: 1, border: "none", outline: "none" }}
                  />
                  <button className="no-print" onClick={() => deletePartCQuestion("optionB")} style={{ background: "transparent", border: "none", color: "red", cursor: "pointer" }} title="Delete Question">🗑️</button>
                </td>
                <td align="center">(15)</td>
                <td><input type="text" value={partC.optionB.co} onChange={(e) => handlePartCChange("optionB", "co", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                <td><input type="text" value={partC.optionB.bl} onChange={(e) => handlePartCChange("optionB", "bl", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
                <td><input type="text" value={partC.optionB.pi} onChange={(e) => handlePartCChange("optionB", "pi", e.target.value)} style={{ width: "90%", border: "none" }} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          #paper-sheet {
            border: none !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          input, select {
            border: none !important;
            background: transparent !important;
            appearance: none;
          }
        }
      `}</style>
    </div>
  );
}

export default QuestionPaperBuilder;