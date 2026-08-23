import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DiagramEditor from "../../components/DiagramEditor"; // your DiagramEditor component path

import React, { useEffect, useState } from "react";
import axios from "axios";
import DiagramEditor from "../../components/DiagramEditor"; // your DiagramEditor component path

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


const SAVED_DIAGRAMS_KEY =
  "questionPaperBuilder_diagrams";


export default function QuestionPaperBuilder() {
  const predictionTimers = useRef(new Map());
  const selectedSubjectCode = useRef("");

  const [editingId, setEditingId] = useState(null);
  const [savedPapersList, setSavedPapersList] = useState([]);
  const [showListModal, setShowListModal] = useState(false);




  
const [savedDiagrams, setSavedDiagrams] =
  useState([]);



  const handleDeleteDiagram = (questionId, location = "diagram") => {
  setQuestions(prev =>
    prev.map(q => {
      if (q.id !== questionId) return q;

      if (location === "optionA") {
        return {
          ...q,
          optionA: {
            ...q.optionA,
            diagram: null,
          },
        };
      }

      if (location === "optionB") {
        return {
          ...q,
          optionB: {
            ...q.optionB,
            diagram: null,
          },
        };
      }

      return {
        ...q,
        diagram: null,
      };
    })
  );
};









  // DIAGRAM MODAL STATES
  const [showDiagramEditor, setShowDiagramEditor] = useState(false);
  const [diagramTarget, setDiagramTarget] = useState(null);

  // EMPTY INITIAL HEADER STATE
  const [header, setHeader] = useState({
    collegeName: "A.V.C. College Of Engineering , Mannampandal",
    examName: "",
    examMonth: "",
    examYear: "",
    branch: "",
    section: "",
    semester: "",
    subjectCode: "",
    subjectName: "",
    regulation: "2021",
    duration: "Three Hours",
    date: "",
    time: "",
    maxMarks: "100",
  });

  const [subjectList, setSubjectList] = useState([]);

  const formatDateDDMMYYYY = (rawDate) => {
    if (!rawDate) return "___";
    const parts = rawDate.split("-");
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return rawDate;
  };

  // EMPTY PART A (1 to 10 Questions)
  const [partA, setPartA] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      qNo: (i + 1).toString(),
      question: "",
      marks: "( 2 )",
      co: "",
      bl: "",
      pi: "",
      diagram: null,
    }))
  );

  // FIXED PART B (11 to 15 Questions)
  const createDefaultPartBQuestion = (qNum) => ({
    qNo: qNum.toString(),
    typeA: "single",
    typeB: "single",
    optionA: {
      question: "",
      marks: "( 13 )",
      co: "",
      bl: "",
      pi: "",
      diagram: null,
      subQuestions: [
        { label: "i)", question: "", marks: "( 6 )", co: "", bl: "", pi: "", diagram: null },
        { label: "ii)", question: "", marks: "( 7 )", co: "", bl: "", pi: "", diagram: null },
      ],
    },
    optionB: {
      question: "",
      marks: "( 13 )",
      co: "",
      bl: "",
      pi: "",
      diagram: null,
      subQuestions: [
        { label: "i)", question: "", marks: "( 6 )", co: "", bl: "", pi: "", diagram: null },
        { label: "ii)", question: "", marks: "( 7 )", co: "", bl: "", pi: "", diagram: null },
      ],
    },
  });

  const [partB, setPartB] = useState([
    createDefaultPartBQuestion(11),
    createDefaultPartBQuestion(12),
    createDefaultPartBQuestion(13),
    createDefaultPartBQuestion(14),
    createDefaultPartBQuestion(15),
  ]);

  // FIXED PART C (Q.No 16)
  const [partC, setPartC] = useState({
    qNo: "16",
    typeA: "single",
    typeB: "single",
    optionA: {
      question: "",
      marks: "( 15 )",
      co: "",
      bl: "",
      pi: "",
      diagram: null,
      subQuestions: [
        { label: "i)", question: "", marks: "( 7 )", co: "", bl: "", pi: "", diagram: null },
        { label: "ii)", question: "", marks: "( 8 )", co: "", bl: "", pi: "", diagram: null },
      ],
    },
    optionB: {
      question: "",
      marks: "( 15 )",
      co: "",
      bl: "",
      pi: "",
      diagram: null,
      subQuestions: [
        { label: "i)", question: "", marks: "( 7 )", co: "", bl: "", pi: "", diagram: null },
        { label: "ii)", question: "", marks: "( 8 )", co: "", bl: "", pi: "", diagram: null },
      ],
    },
  });

  // PRINT HANDLER WITH AUTO REFRESH
  const handlePrint = () => {
    window.print();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

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
      selectedSubjectCode.current = paper.subjectCode || "";

      
      const currentSemSubjects = subjectsBySemester[paper.semester] || [];
      setSubjectList(currentSemSubjects);

      setHeader({
        collegeName: paper.collegeName || "A.V.C. College Of Engineering , Mannampandal",
        examName: paper.examName || "",
        examMonth: paper.examMonth || "",
        examYear: paper.examYear || "",
        branch: paper.branch || "",
        section: paper.section ?? "",
        semester: paper.semester || "",
        subjectCode: paper.subjectCode || "",
        subjectName: paper.subjectName || "",
        regulation: paper.regulation || "2021",
        duration: paper.duration || "Three Hours",
        date: paper.date || "",
        time: paper.time || "",
        maxMarks: paper.maxMarks || "100",
      });
      if (paper.partA) {
        setPartA(
          paper.partA.map((item) => ({
            ...item,
            diagram: item.diagram || null,
          }))
        );
      }
      if (paper.partB) setPartB(paper.partB);
      if (paper.partC) setPartC({ ...partC, ...paper.partC });
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
      selectedSubjectCode.current = "";

      setHeader({
        ...header,
        semester: value,
        subjectCode: "",
        subjectName: "",
      });
    } else {
      setHeader({ ...header, [name]: value });
    }
  };

  const handleSubjectChange = (e) => {
    const selectedCode = e.target.value;
    const foundSubject = subjectList.find((sub) => sub.code === selectedCode);
    selectedSubjectCode.current = selectedCode;
    const clearMetadata = (item) => ({ ...item, co: "", bl: "", pi: "" });
    setPartA((current) => current.map(clearMetadata));
    setPartB((current) => current.map((item) => ({
      ...item,
      optionA: { ...clearMetadata(item.optionA), subQuestions: item.optionA.subQuestions.map(clearMetadata) },
      optionB: { ...clearMetadata(item.optionB), subQuestions: item.optionB.subQuestions.map(clearMetadata) },
    })));
    setPartC((current) => ({
      ...current,
      optionA: { ...clearMetadata(current.optionA), subQuestions: current.optionA.subQuestions.map(clearMetadata) },
      optionB: { ...clearMetadata(current.optionB), subQuestions: current.optionB.subQuestions.map(clearMetadata) },
    }));

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
    setPartA(updated);
  };

  const predictQuestionMetadata = async (question) => {
    if (!question.trim()) return { co: "", bl: "", pi: "" };

    const response = await axios.post(
      "http://localhost:5000/api/prediction/predict",
      { question, subjectCode: selectedSubjectCode.current || header.subjectCode },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    const prediction = response.data.prediction;
    const bloomLevel = prediction.bloomLevel || "";
    return {
      co: prediction.co || "",
      bl: bloomLevel.replace(/^BL/i, "L"),
      pi: prediction.pi || "",
    };
  };

  const schedulePrediction = (key, predict) => {
    const previousTimer = predictionTimers.current.get(key);
    if (previousTimer) clearTimeout(previousTimer);

    const timer = setTimeout(async () => {
      try {
        await predict();
      } catch (error) {
        console.error("Question prediction failed:", error);
      }
    }, 250);
    predictionTimers.current.set(key, timer);
  };

  const predictPartA = async (index, question) => {
    try {
      const metadata = await predictQuestionMetadata(question);
      setPartA((current) => current.map((item, itemIndex) =>
        itemIndex === index && item.question === question
          ? { ...item, ...metadata }
          : item
      ));
    } catch (error) {
      console.error("Question prediction failed:", error);
    }
  };

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
    setPartB(updated);
  };

  const predictPartB = async (qIndex, optionKey, subIndex = null, question) => {
    try {
      const metadata = await predictQuestionMetadata(question);
      setPartB((current) => current.map((item, itemIndex) => {
        if (itemIndex !== qIndex) return item;
        const optionName = optionKey === "A" ? "optionA" : "optionB";
        const option = { ...item[optionName] };
        if (subIndex === null) {
          if (option.question !== question) return item;
          return { ...item, [optionName]: { ...option, ...metadata } };
        }
        if (option.subQuestions[subIndex]?.question !== question) return item;
        const subQuestions = [...option.subQuestions];
        subQuestions[subIndex] = { ...subQuestions[subIndex], ...metadata };
        return { ...item, [optionName]: { ...option, subQuestions } };
      }));
    } catch (error) {
      console.error("Question prediction failed:", error);
    }
    if (field === "question") {
      const detected = autoDetectCOBLPI(value);
      targetOpt.co = detected.co;
      targetOpt.bl = detected.bl;
      targetOpt.pi = detected.pi;
    }
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
    targetOpt.subQuestions = targetOpt.subQuestions.filter((_, idx) => idx !== subIndex);
    setPartB(updated);
  };

  const addSubQuestion = (qIndex, optionKey) => {
    const updated = [...partB];
    const targetOpt = optionKey === "A" ? updated[qIndex].optionA : updated[qIndex].optionB;
    const labels = ["i)", "ii)", "iii)", "iv)"];
    const nextLabel = labels[targetOpt.subQuestions.length] || `${targetOpt.subQuestions.length + 1})`;
    targetOpt.subQuestions.push({ label: nextLabel, question: "", marks: "( 5 )", co: "", bl: "", pi: "", diagram: null });
    setPartB(updated);
  };

  /* Part C Sub-Questions Logic */
  const togglePartCType = (optionKey, type) => {
    if (optionKey === "A") setPartC({ ...partC, typeA: type });
    else setPartC({ ...partC, typeB: type });
  };

  const handlePartCSubChange = (optionKey, subIndex, field, value) => {
    const targetOpt = optionKey === "A" ? { ...partC.optionA } : { ...partC.optionB };
    const updatedSubs = [...targetOpt.subQuestions];
    updatedSubs[subIndex] = { ...updatedSubs[subIndex], [field]: value };

    if (field === "question") {
      const detected = autoDetectCOBLPI(value);
      updatedSubs[subIndex].co = detected.co;
      updatedSubs[subIndex].bl = detected.bl;
      updatedSubs[subIndex].pi = detected.pi;
    }
    targetOpt.subQuestions = updatedSubs;
    if (optionKey === "A") setPartC({ ...partC, optionA: targetOpt });
    else setPartC({ ...partC, optionB: targetOpt });
  };

  const predictPartC = async (optionKey, subIndex, question) => {
    try {
      const metadata = await predictQuestionMetadata(question);
      setPartC((current) => {
        const optionName = optionKey === "A" ? "optionA" : "optionB";
        const option = { ...current[optionName] };
        if (option.subQuestions[subIndex]?.question !== question) return current;
        const subQuestions = [...option.subQuestions];
        subQuestions[subIndex] = { ...subQuestions[subIndex], ...metadata };
        return { ...current, [optionName]: { ...option, subQuestions } };
      });
    } catch (error) {
      console.error("Question prediction failed:", error);
    }
  };

  const addPartCSubQuestion = (optionKey) => {
    const targetOpt = optionKey === "A" ? { ...partC.optionA } : { ...partC.optionB };
    const labels = ["i)", "ii)", "iii)", "iv)"];
    const nextLabel = labels[targetOpt.subQuestions.length] || `${targetOpt.subQuestions.length + 1})`;
    const updatedSubs = [...targetOpt.subQuestions, { label: nextLabel, question: "", marks: "( 5 )", co: "", bl: "", pi: "", diagram: null }];
    targetOpt.subQuestions = updatedSubs;
    if (optionKey === "A") setPartC({ ...partC, optionA: targetOpt });
    else setPartC({ ...partC, optionB: targetOpt });
  };

  const deletePartCSub = (optionKey, subIndex) => {
    const targetOpt = optionKey === "A" ? { ...partC.optionA } : { ...partC.optionB };
    targetOpt.subQuestions = targetOpt.subQuestions.filter((_, idx) => idx !== subIndex);
    if (optionKey === "A") setPartC({ ...partC, optionA: targetOpt });
    else setPartC({ ...partC, optionB: targetOpt });
  };

  /* DIAGRAM SAVE HANDLER */
  const handleDiagramSave = (diagramData) => {
    if (!diagramTarget) return;
    const { section, qIdx, optionKey, sIdx } = diagramTarget;

    if (section === "partA") {
      const updated = [...partA];
      updated[qIdx] = {
        ...updated[qIdx],
        diagram: diagramData,
      };
      setPartA(updated);
      setShowDiagramEditor(false);
      return;
    }

    if (section === "partC") {
      const targetOpt = optionKey === "A" ? { ...partC.optionA } : { ...partC.optionB };
      if (sIdx !== null && sIdx !== undefined) {
        targetOpt.subQuestions[sIdx].diagram = diagramData;
      } else {
        targetOpt.diagram = diagramData;
      }
      if (optionKey === "A") setPartC({ ...partC, optionA: targetOpt });
      else setPartC({ ...partC, optionB: targetOpt });
    } else {
      const updated = [...partB];
      const targetOpt = optionKey === "A" ? updated[qIdx].optionA : updated[qIdx].optionB;
      if (sIdx !== null && sIdx !== undefined) {
        targetOpt.subQuestions[sIdx].diagram = diagramData;
      } else {
        targetOpt.diagram = diagramData;
      }
      setPartB(updated);
    }

    setSavedDiagrams((prev) => [
      ...prev.filter(
        (item) =>
          JSON.stringify(item.target) !==
          JSON.stringify(diagramTarget)
      ),
      {
        target: diagramTarget,
        diagram: diagramData,
      },
    ]);

    setShowDiagramEditor(false);
  };

  /* DIAGRAM RENDER HELPER IN TABLE CELL */
const renderDiagramPreview = (diagram, target = null) => {
  if (!diagram) return null;

  const handleDeletePreview = () => {
    if (!target) return;

    if (
      window.confirm(
        "Are you sure you want to delete this diagram?"
      )
    ) {
      setDiagramTarget(target);
      
      // Directly delete the selected diagram
      const { section, qIdx, optionKey, sIdx } = target;

      if (section === "partA") {
        const updated = [...partA];

        if (updated[qIdx]) {
          updated[qIdx] = {
            ...updated[qIdx],
            diagram: null,
          };
        }

        setPartA(updated);
      }

      if (section === "partB") {
        const updated = [...partB];

        if (updated[qIdx]) {
          const optionName =
            optionKey === "A"
              ? "optionA"
              : "optionB";

          const targetOpt = {
            ...updated[qIdx][optionName],
          };

          if (
            sIdx !== null &&
            sIdx !== undefined
          ) {
            targetOpt.subQuestions = [
              ...targetOpt.subQuestions,
            ];

            if (targetOpt.subQuestions[sIdx]) {
              targetOpt.subQuestions[sIdx] = {
                ...targetOpt.subQuestions[sIdx],
                diagram: null,
              };
            }
          } else {
            targetOpt.diagram = null;
          }

          updated[qIdx] = {
            ...updated[qIdx],
            [optionName]: targetOpt,
          };
        }

        setPartB(updated);
      }

      if (section === "partC") {
        const targetOpt =
          optionKey === "A"
            ? { ...partC.optionA }
            : { ...partC.optionB };

        if (
          sIdx !== null &&
          sIdx !== undefined
        ) {
          targetOpt.subQuestions = [
            ...targetOpt.subQuestions,
          ];

          if (targetOpt.subQuestions[sIdx]) {
            targetOpt.subQuestions[sIdx] = {
              ...targetOpt.subQuestions[sIdx],
              diagram: null,
            };
          }
        } else {
          targetOpt.diagram = null;
        }

        if (optionKey === "A") {
          setPartC({
            ...partC,
            optionA: targetOpt,
          });
        } else {
          setPartC({
            ...partC,
            optionB: targetOpt,
          });
        }
      }

      setSavedDiagrams((prev) =>
        prev.filter(
          (item) =>
            JSON.stringify(item.target) !==
            JSON.stringify(target)
        )
      );

      setDiagramTarget(null);
    }
  };

  const handleEditPreview = () => {
    if (!target) return;

    setDiagramTarget(target);
    setShowDiagramEditor(true);
  };

  return (
    <div
      style={{
        marginTop: "6px",
        display: "block",
      }}
    >
      {/* DIAGRAM IMAGE ONLY */}
      {diagram.imageDataUrl && (
        <img
          src={diagram.imageDataUrl}
          alt={diagram.name || "Diagram"}
          style={{
            display: "block",
            width: "200px",
            height: "auto",
            maxHeight: "120px",
            objectFit: "contain",
            border: "none",
            background: "transparent",
          }}
        />
      )}

      {/* EDIT / DELETE - NOT PRINTED */}
      {target && (
        <div
          className="no-print"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "5px",
          }}
        >
          <button
            type="button"
            onClick={handleEditPreview}
            style={{
              padding: "3px 8px",
              fontSize: "11px",
              border: "1px solid #3182ce",
              background: "#ebf8ff",
              color: "#2b6cb0",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ✏️ Edit Diagram
          </button>

          <button
            type="button"
            onClick={handleDeletePreview}
            style={{
              padding: "3px 8px",
              fontSize: "11px",
              border: "1px solid #e53e3e",
              background: "#fff5f5",
              color: "#c53030",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

  const openDiagramEditor = (target) => {
    setDiagramTarget(target);
    setShowDiagramEditor(true);
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

  const getActiveQuestions = (item) => [
    ...(item.typeA === "split" ? item.optionA?.subQuestions || [] : [item.optionA]),
    ...(item.typeB === "split" ? item.optionB?.subQuestions || [] : [item.optionB]),
  ];
  const chartQuestions = [
    ...partA,
    ...partB.flatMap(getActiveQuestions),
    ...getActiveQuestions(partC),
  ].filter((item) => item?.question?.trim());

  const getQuestionMarks = (marks) => {
    const value = Number.parseInt(String(marks || "").replace(/[^0-9]/g, ""), 10);
    return Number.isFinite(value) ? value : 0;
  };

  const normalizeLabel = (value, prefix) => {
    const match = String(value || "").trim().toUpperCase().match(new RegExp(`^${prefix}L?(\\d+)$`));
    return match ? `${prefix}${match[1]}` : "";
  };
  const normalizeBloomLabel = (value) => {
    const normalized = String(value || "").trim().toUpperCase().replace(/^BL/, "L");
    return /^L[1-6]$/.test(normalized) ? normalized : "";
  };
  const coDistribution = ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6"].map((label) => ({
    label,
    marks: chartQuestions.filter((item) => normalizeLabel(item.co, "CO") === label)
      .reduce((total, item) => total + getQuestionMarks(item.marks), 0),
  }));
  const bloomDistribution = ["L1", "L2", "L3", "L4", "L5", "L6"].map((label) => ({
    label,
    color: ["#3182ce", "#38a169", "#dd6b20", "#805ad5", "#e53e3e", "#718096"][Number(label.slice(1)) - 1],
    marks: chartQuestions.filter((item) => normalizeBloomLabel(item.bl) === label)
      .reduce((total, item) => total + getQuestionMarks(item.marks), 0),
  }));
  const totalBloomMarks = bloomDistribution.reduce((total, item) => total + item.marks, 0);
  const bloomGradient = bloomDistribution.reduce((result, item) => {
    const start = result.end;
    const end = totalBloomMarks ? start + (item.marks / totalBloomMarks) * 360 : start;
    result.parts.push(`${item.color} ${start}deg ${end}deg`);
    item.startAngle = start;
    item.endAngle = end;
    result.end = end;
    return result;
  }, { parts: [], end: 0 });
  const coChartMaximum = Math.max(50, Math.ceil(Math.max(...coDistribution.map((item) => item.marks), 0) / 10) * 10);
  const coChartTicks = Array.from({ length: coChartMaximum / 10 + 1 }, (_, index) => coChartMaximum - index * 10);
  const pieCenter = 100;
  const pieRadius = 78;
  const piePoint = (angle, radius = pieRadius) => ({
    x: pieCenter + radius * Math.cos((angle - 90) * Math.PI / 180),
    y: pieCenter + radius * Math.sin((angle - 90) * Math.PI / 180),
  });
  const piePath = (item) => {
    const start = piePoint(item.startAngle);
    const end = piePoint(item.endAngle);
    const largeArc = item.endAngle - item.startAngle > 180 ? 1 : 0;
    return `M ${pieCenter} ${pieCenter} L ${start.x} ${start.y} A ${pieRadius} ${pieRadius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  };
  const totalQuestionMarks = chartQuestions.reduce((total, item) => total + getQuestionMarks(item.marks), 0);


  return (
    <div style={{ padding: "24px", fontFamily: "Segoe UI, Roboto, sans-serif", backgroundColor: "#f4f6f9", minHeight: "100vh", color: "#333" }}>
      
      {/* EXACT 4-PAGE PRINT CSS STYLES */}
      <style>{`
        .light-table, .light-table th, .light-table td {
          border: 1px solid #cbd5e0 !important;
        }
        .btn-diagram {
          display: inline-flex !important;
          align-items: center !important;
          white-space: nowrap !important;
          padding: 2px 6px !important;
          font-size: 11px !important;
          border-radius: 4px !important;
          border: 1px solid #cbd5e0 !important;
          background: #edf2f7 !important;
          cursor: pointer !important;
          margin-left: 6px !important;
        }
        .analysis-charts {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          align-items: start;
        }
        .analysis-chart-column {
          min-width: 0;
        }
        @media (max-width: 700px) {
          .analysis-charts {
            grid-template-columns: 1fr;
          }
        }
      @media print {
  /* Page margins-a normalize panna */
  @page {
    margin: 10mm;
  }

  .no-print { display: none !important; }
  body { background: #fff !important; padding: 0 !important; margin: 0 !important; }
  #paper-sheet { border: none !important; box-shadow: none !important; width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
  input { border: none !important; background: transparent !important; }
  
  /* 4-PAGE BREAK CONTROL (FIXED) */
  .page-1, .page-2, .page-3 { 
    break-after: page;          /* Modern Browsers */
    page-break-after: always;   /* Fallback */
    height: auto !important;    /* 98vh-kku badhula auto */
  }

  .page-4 { 
    break-after: avoid; 
    page-break-after: avoid; 
    height: auto !important; 
  }

  .light-table, .light-table th, .light-table td {
    border: 1px solid #000 !important;
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
            <select style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} name="examName" value={header.examName} onChange={handleHeaderChange}>
              <option value="">-- Select Exam --</option>
              <option value="I CIA TEST">I CIA TEST</option>
              <option value="II CIA TEST">II CIA TEST</option>
              <option value="MODEL TEST">MODEL TEST</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Month & Year:</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <select style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} name="examMonth" value={header.examMonth} onChange={handleHeaderChange}>
                <option value="">-- Select Month --</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <select style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} name="examYear" value={header.examYear} onChange={handleHeaderChange}>
                <option value="">-- Select Year --</option>
                {["2024", "2025", "2026", "2027", "2028", "2029", "2030"].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Branch / Department:</label>
              <input style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} type="text" name="branch" value={header.branch} onChange={handleHeaderChange} placeholder="e.g. B.TECH - INFORMATION TECHNOLOGY" />
            </div>
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Section:</label>
              <select style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} name="section" value={header.section} onChange={handleHeaderChange}>
                <option value="">-- Select --</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="">None</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Semester:</label>
            <select style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} name="semester" value={header.semester} onChange={handleHeaderChange}>
              <option value="">-- Select Semester --</option>
              {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#4a5568" }}>Subject Code & Name:</label>
            <select style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e0" }} value={header.subjectCode} onChange={handleSubjectChange}>
              <option value="">-- Select Subject --</option>
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
              <option value="">-- Select Time --</option>
              <option value="9:30 AM - 12:30 PM">9:30 AM - 12:30 PM</option>
              <option value="1:30 PM - 4:30 PM">1:30 PM - 4:30 PM</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ flex: 1, padding: "10px", background: editingId ? "#dd6b20" : "#38a169", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }} onClick={saveOrUpdateQuestionPaper}>
            {editingId ? "Update Question Paper" : "Save Question Paper"}
          </button>
          <button style={{ flex: 1, padding: "10px", background: "#3182ce", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }} onClick={handlePrint}>
            🖨️ Print & Auto-Refresh
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

      {/* DIAGRAM EDITOR MODAL */}
      {showDiagramEditor && (
        <div className="no-print" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000, overflowY: "auto", padding: "20px", boxSizing: "border-box" }}>
          <div style={{ background: "#fff", width: "900px", maxWidth: "95%", maxHeight: "95vh", overflowY: "auto", borderRadius: "10px", padding: "20px", position: "relative" }}>
            <button
              type="button"
              onClick={() => setShowDiagramEditor(false)}
              style={{ position: "absolute", top: "10px", right: "10px", background: "#e53e3e", color: "#fff", border: "none", borderRadius: "5px", padding: "6px 10px", cursor: "pointer", fontWeight: "bold", zIndex: 10 }}
            >
              ✕ Close
            </button>

            <DiagramEditor
              onSave={handleDiagramSave}
              initialData={
                diagramTarget
                  ? (
                      diagramTarget.section === "partA"
                        ? partA[diagramTarget.qIdx]?.diagram
                        : diagramTarget.section === "partC"
                          ? (diagramTarget.sIdx !== null && diagramTarget.sIdx !== undefined
                              ? partC[diagramTarget.optionKey === "A" ? "optionA" : "optionB"].subQuestions[diagramTarget.sIdx]?.diagram
                              : partC[diagramTarget.optionKey === "A" ? "optionA" : "optionB"]?.diagram)
                          : (diagramTarget.sIdx !== null && diagramTarget.sIdx !== undefined
                              ? partB[diagramTarget.qIdx][diagramTarget.optionKey === "A" ? "optionA" : "optionB"].subQuestions[diagramTarget.sIdx]?.diagram
                              : partB[diagramTarget.qIdx][diagramTarget.optionKey === "A" ? "optionA" : "optionB"]?.diagram)
                    )
                  : null
              }
            />
          </div>
        </div>
      )}

      {/* PRINTABLE QUESTION PAPER SHEET */}
      <div id="paper-sheet" style={{ background: "#ffffff", padding: "40px", border: "1px solid #d2d6dc", maxWidth: "850px", margin: "0 auto", borderRadius: "4px" }}>
        
        {/* PAGE 1: HEADER & PART A ONLY */}
        <div className="page-1">
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

          <div style={{ textAlign: "center", textTransform: "uppercase", fontWeight: "bold", fontSize: "13px", lineHeight: "1.4" }}>
            <div>{header.collegeName}</div>
            <div>{header.examName || "________"} - {header.examMonth || "________"} {header.examYear || "____"}</div>
            <div>{header.branch || "________________"}{header.section ? ` - SEC ${header.section}` : ''}</div>
            <div>{header.semester || "____"}- SEMESTER</div>
            <div>{header.subjectCode || "________"} - {header.subjectName || "________________"}</div>
            <div style={{ fontSize: "11px", fontWeight: "normal" }}>(Regulation {header.regulation})</div>
          </div>

          <div style={{ marginTop: "15px", marginBottom: "12px", fontSize: "12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
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
              <span>{header.time || "__________"}</span>
            </div>
          </div>

          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", marginBottom: "10px" }}>Answer ALL Questions</div>

          {/* PART A (10 QUESTIONS ONLY) */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", marginBottom: "5px" }}>
              PART – A ( 10 x 2 = 20 Marks )
            </div>
            
            <table className="light-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <thead>
                <tr style={{ background: "#f7fafc" }}>
                  <th style={{ width: "35px", padding: "6px" }}>Q.No</th>
                  <th style={{ padding: "6px" }}>Questions</th>
                  <th style={{ width: "45px", padding: "6px" }}>Marks</th>
                  <th style={{ width: "45px", padding: "6px" }}>CO</th>
                  <th style={{ width: "35px", padding: "6px" }}>BL</th>
                  <th style={{ width: "45px", padding: "6px" }}>PI</th>
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
                          onChange={(e) => { handlePartAChange(idx, e.target.value); schedulePrediction(`partA-${idx}`, () => predictPartA(idx, e.target.value)); }}
                          onBlur={(e) => predictPartA(idx, e.target.value)}
                          onChange={(e) => handlePartAChange(idx, e.target.value)}
                          placeholder={`Enter Short Question ${idx + 1}`}
                        />
                        <button
                          className="no-print btn-diagram"
                          onClick={() => {
                            setDiagramTarget({
                              section: "partA",
                              qIdx: idx,
                              optionKey: null,
                              sIdx: null,
                            });
                            setShowDiagramEditor(true);
                          }}
                        >
                          ✏️ Diagram
                        </button>
                      </div>
                  {renderDiagramPreview(q.diagram, {
  section: "partA",
  qIdx: idx,
  optionKey: null,
  sIdx: null,
})}
                    </td>
                    <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.marks} onChange={(e) => handlePartAMetaChange(idx, "marks", e.target.value)} /></td>
                    <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.co} onChange={(e) => handlePartAMetaChange(idx, "co", e.target.value)} /></td>
                    <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.bl} onChange={(e) => handlePartAMetaChange(idx, "bl", e.target.value)} /></td>
                    <td style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.pi} onChange={(e) => handlePartAMetaChange(idx, "pi", e.target.value)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGE 2 & 3: PART B - CONSTANT 11 TO 15 */}
        <div className="page-2">
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", marginBottom: "8px" }}>
            PART – B ( 5 x 13 = 65 Marks )
          </div>
          
          <table className="light-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ background: "#f7fafc" }}>
                <th style={{ width: "35px", padding: "6px" }}>Q.No</th>
                <th style={{ padding: "6px" }}>Questions</th>
                <th style={{ width: "45px", padding: "6px" }}>Marks</th>
                <th style={{ width: "45px", padding: "6px" }}>CO</th>
                <th style={{ width: "35px", padding: "6px" }}>BL</th>
                <th style={{ width: "45px", padding: "6px" }}>PI</th>
              </tr>
            </thead>
            <tbody>
              {partB.map((q, qIndex) => (
                <React.Fragment key={qIndex}>
                  {/* OPTION A */}
                  <tr style={{ borderTop: "2px solid #cbd5e0" }}>
                    <td align="center" rowSpan={q.typeA === "single" ? 1 : q.optionA.subQuestions.length + 1} style={{ padding: "6px", verticalAlign: "top" }}>
                      <b>{q.qNo}.</b>
                    </td>
                    <td style={{ padding: "6px" }}>
                      <div className="no-print" style={{ marginBottom: "4px", fontSize: "10px", color: "#666" }}>
                        <strong>Option A Type:</strong>
                        <label style={{ marginLeft: "6px" }}><input type="radio" name={`typeA_${qIndex}`} checked={q.typeA === "single"} onChange={() => togglePartBType(qIndex, "A", "single")} /> Single</label>
                        <label style={{ marginLeft: "6px" }}><input type="radio" name={`typeA_${qIndex}`} checked={q.typeA === "split"} onChange={() => togglePartBType(qIndex, "A", "split")} /> Sub-Questions</label>
                      </div>

                      {q.typeA === "single" ? (
                        <div>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ fontWeight: "bold", marginRight: "6px" }}>(a)</span>
                            <input
                              type="text"
                              style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                              value={q.optionA.question}
                              onChange={(e) => { handlePartBSingleChange(qIndex, "A", "question", e.target.value); schedulePrediction(`partB-${qIndex}-A`, () => predictPartB(qIndex, "A", null, e.target.value)); }}
                              onBlur={(e) => predictPartB(qIndex, "A", null, e.target.value)}
                              onChange={(e) => handlePartBSingleChange(qIndex, "A", "question", e.target.value)}
                              placeholder={`Enter Question ${q.qNo} (a)`}
                            />
                            <button
                              className="no-print btn-diagram"
                              onClick={() => {
                                setDiagramTarget({ section: "partB", qIdx: qIndex, optionKey: "A", sIdx: null });
                                setShowDiagramEditor(true);
                              }}
                            >
                              ✏️ Diagram
                            </button>
                          </div>
                       {renderDiagramPreview(q.optionA.diagram, {
  section: "partB",
  qIdx: qIndex,
  optionKey: "A",
  sIdx: null,
})}
                        </div>
                      ) : (
                        <div>
                          <span style={{ fontWeight: "bold" }}>(a)</span>
                          <button className="no-print" style={{ marginLeft: "10px", fontSize: "11px", padding: "1px 6px", cursor: "pointer" }} onClick={() => addSubQuestion(qIndex, "A")}>+ Add Sub Question</button>
                        </div>
                      )}
                    </td>

                    {q.typeA === "single" ? (
                      <>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.optionA.marks} onChange={(e) => handlePartBSingleChange(qIndex, "A", "marks", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.optionA.co} onChange={(e) => handlePartBSingleChange(qIndex, "A", "co", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.optionA.bl} onChange={(e) => handlePartBSingleChange(qIndex, "A", "bl", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.optionA.pi} onChange={(e) => handlePartBSingleChange(qIndex, "A", "pi", e.target.value)} /></td>
                      </>
                    ) : (
                      <td colSpan={4} style={{ background: "#fcfcfc" }}></td>
                    )}
                  </tr>

                  {/* SUB QUESTIONS OPTION A */}
                  {q.typeA === "split" &&
                    q.optionA.subQuestions.map((sub, sIdx) => (
                      <tr key={`A_sub_${sIdx}`}>
                        <td style={{ padding: "6px", paddingLeft: "20px" }}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ fontWeight: "bold", marginRight: "6px" }}>{sub.label}</span>
                            <input
                              type="text"
                              style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                              value={sub.question}
                              onChange={(e) => { handlePartBSubChange(qIndex, "A", sIdx, "question", e.target.value); schedulePrediction(`partB-${qIndex}-A-${sIdx}`, () => predictPartB(qIndex, "A", sIdx, e.target.value)); }}
                              onBlur={(e) => predictPartB(qIndex, "A", sIdx, e.target.value)}
                              onChange={(e) => handlePartBSubChange(qIndex, "A", sIdx, "question", e.target.value)}
                              placeholder={`Enter Sub Question ${sub.label}`}
                            />
                            <button
                              className="no-print btn-diagram"
                              onClick={() => {
                                setDiagramTarget({ section: "partB", qIdx: qIndex, optionKey: "A", sIdx });
                                setShowDiagramEditor(true);
                              }}
                            >
                              ✏️ Diagram
                            </button>
                            <button className="no-print" onClick={() => deletePartBSub(qIndex, "A", sIdx)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer" }}>🗑️</button>
                          </div>
                      {renderDiagramPreview(sub.diagram, {
  section: "partB",
  qIdx: qIndex,
  optionKey: "A",
  sIdx,
})}
                        </td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.marks} onChange={(e) => handlePartBSubChange(qIndex, "A", sIdx, "marks", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.co} onChange={(e) => handlePartBSubChange(qIndex, "A", sIdx, "co", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.bl} onChange={(e) => handlePartBSubChange(qIndex, "A", sIdx, "bl", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.pi} onChange={(e) => handlePartBSubChange(qIndex, "A", sIdx, "pi", e.target.value)} /></td>
                      </tr>
                    ))}

                  {/* OR ROW */}
                  <tr>
                    <td colSpan={6} align="center" style={{ fontWeight: "bold", background: "#f7fafc", padding: "4px" }}>
                      OR
                    </td>
                  </tr>

                  {/* OPTION B */}
                  <tr>
                    <td align="center" rowSpan={q.typeB === "single" ? 1 : q.optionB.subQuestions.length + 1} style={{ padding: "6px", verticalAlign: "top" }}>
                    </td>
                    <td style={{ padding: "6px" }}>
                      <div className="no-print" style={{ marginBottom: "4px", fontSize: "10px", color: "#666" }}>
                        <strong>Option B Type:</strong>
                        <label style={{ marginLeft: "6px" }}><input type="radio" name={`typeB_${qIndex}`} checked={q.typeB === "single"} onChange={() => togglePartBType(qIndex, "B", "single")} /> Single</label>
                        <label style={{ marginLeft: "6px" }}><input type="radio" name={`typeB_${qIndex}`} checked={q.typeB === "split"} onChange={() => togglePartBType(qIndex, "B", "split")} /> Sub-Questions</label>
                      </div>

                      {q.typeB === "single" ? (
                        <div>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ fontWeight: "bold", marginRight: "6px" }}>(b)</span>
                            <input
                              type="text"
                              style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                              value={q.optionB.question}
                              onChange={(e) => { handlePartBSingleChange(qIndex, "B", "question", e.target.value); schedulePrediction(`partB-${qIndex}-B`, () => predictPartB(qIndex, "B", null, e.target.value)); }}
                              onBlur={(e) => predictPartB(qIndex, "B", null, e.target.value)}
                              onChange={(e) => handlePartBSingleChange(qIndex, "B", "question", e.target.value)}
                              placeholder={`Enter Question ${q.qNo} (b)`}
                            />
                            <button
                              className="no-print btn-diagram"
                              onClick={() => {
                                setDiagramTarget({ section: "partB", qIdx: qIndex, optionKey: "B", sIdx: null });
                                setShowDiagramEditor(true);
                              }}
                            >
                              ✏️ Diagram
                            </button>
                          </div>
                       {renderDiagramPreview(q.optionB.diagram, {
  section: "partB",
  qIdx: qIndex,
  optionKey: "B",
  sIdx: null,
})}
                        </div>
                      ) : (
                        <div>
                          <span style={{ fontWeight: "bold" }}>(b)</span>
                          <button className="no-print" style={{ marginLeft: "10px", fontSize: "11px", padding: "1px 6px", cursor: "pointer" }} onClick={() => addSubQuestion(qIndex, "B")}>+ Add Sub Question</button>
                        </div>
                      )}
                    </td>

                    {q.typeB === "single" ? (
                      <>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.optionB.marks} onChange={(e) => handlePartBSingleChange(qIndex, "B", "marks", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.optionB.co} onChange={(e) => handlePartBSingleChange(qIndex, "B", "co", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.optionB.bl} onChange={(e) => handlePartBSingleChange(qIndex, "B", "bl", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={q.optionB.pi} onChange={(e) => handlePartBSingleChange(qIndex, "B", "pi", e.target.value)} /></td>
                      </>
                    ) : (
                      <td colSpan={4} style={{ background: "#fcfcfc" }}></td>
                    )}
                  </tr>

                  {/* SUB QUESTIONS OPTION B */}
                  {q.typeB === "split" &&
                    q.optionB.subQuestions.map((sub, sIdx) => (
                      <tr key={`B_sub_${sIdx}`}>
                        <td style={{ padding: "6px", paddingLeft: "20px" }}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ fontWeight: "bold", marginRight: "6px" }}>{sub.label}</span>
                            <input
                              type="text"
                              style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                              value={sub.question}
                              onChange={(e) => { handlePartBSubChange(qIndex, "B", sIdx, "question", e.target.value); schedulePrediction(`partB-${qIndex}-B-${sIdx}`, () => predictPartB(qIndex, "B", sIdx, e.target.value)); }}
                              onBlur={(e) => predictPartB(qIndex, "B", sIdx, e.target.value)}

                              onChange={(e) => handlePartBSubChange(qIndex, "B", sIdx, "question", e.target.value)}
                              placeholder={`Enter Sub Question ${sub.label}`}
                            />
                            <button
                              className="no-print btn-diagram"
                              onClick={() => {
                                setDiagramTarget({ section: "partB", qIdx: qIndex, optionKey: "B", sIdx });
                                setShowDiagramEditor(true);
                              }}
                            >
                              ✏️ Diagram
                            </button>
                            <button className="no-print" onClick={() => deletePartBSub(qIndex, "B", sIdx)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer" }}>🗑️</button>
                          </div>
                       {renderDiagramPreview(sub.diagram, {
  section: "partB",
  qIdx: qIndex,
  optionKey: "B",
  sIdx,
})}
                        </td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.marks} onChange={(e) => handlePartBSubChange(qIndex, "B", sIdx, "marks", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.co} onChange={(e) => handlePartBSubChange(qIndex, "B", sIdx, "co", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.bl} onChange={(e) => handlePartBSubChange(qIndex, "B", sIdx, "bl", e.target.value)} /></td>
                        <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.pi} onChange={(e) => handlePartBSubChange(qIndex, "B", sIdx, "pi", e.target.value)} /></td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGE 4: PART C ONLY */}
        <div className="page-4" style={{ marginTop: "30px" }}>
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "12px", marginBottom: "8px" }}>
            PART – C ( 1 x 15 = 15 Marks )
          </div>
          
          <table className="light-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ background: "#f7fafc" }}>
                <th style={{ width: "35px", padding: "6px" }}>Q.No</th>
                <th style={{ padding: "6px" }}>Questions</th>
                <th style={{ width: "45px", padding: "6px" }}>Marks</th>
                <th style={{ width: "45px", padding: "6px" }}>CO</th>
                <th style={{ width: "35px", padding: "6px" }}>BL</th>
                <th style={{ width: "45px", padding: "6px" }}>PI</th>
              </tr>
            </thead>
            <tbody>
              {/* OPTION A */}
              <tr style={{ borderTop: "2px solid #cbd5e0" }}>
                <td align="center" rowSpan={partC.typeA === "single" ? 1 : partC.optionA.subQuestions.length + 1} style={{ padding: "6px", verticalAlign: "top" }}>
                  <b>16.</b>
                </td>
                <td style={{ padding: "6px" }}>
                  <div className="no-print" style={{ marginBottom: "4px", fontSize: "10px", color: "#666" }}>
                    <strong>Option A Type:</strong>
                    <label style={{ marginLeft: "6px" }}><input type="radio" name="typeA_partC" checked={partC.typeA === "single"} onChange={() => togglePartCType("A", "single")} /> Single</label>
                    <label style={{ marginLeft: "6px" }}><input type="radio" name="typeA_partC" checked={partC.typeA === "split"} onChange={() => togglePartCType("A", "split")} /> Sub-Questions</label>
                  </div>

                  {partC.typeA === "single" ? (
                    <div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ fontWeight: "bold", marginRight: "6px" }}>(a)</span>
                        <input
                          type="text"
                          style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                          value={partC.optionA.question}
                          onChange={(e) => {
                            handlePartCChange("A", "question", e.target.value);
                            schedulePrediction("partC-A", () => predictQuestionMetadata(e.target.value).then((metadata) => {
                              setPartC((current) => current.optionA.question === e.target.value ? { ...current, optionA: { ...current.optionA, ...metadata } } : current);
                            }));
                          }}
                          onBlur={(e) => predictQuestionMetadata(e.target.value).then((metadata) => setPartC((current) => current.optionA.question === e.target.value ? { ...current, optionA: { ...current.optionA, ...metadata } } : current)).catch((error) => console.error("Question prediction failed:", error))}
                          onChange={(e) => handlePartCChange("A", "question", e.target.value)}
                          placeholder="Enter Part C Question 16 (a)"
                        />
                        <button
                          className="no-print btn-diagram"
                          onClick={() => {
                            setDiagramTarget({ section: "partC", qIdx: 0, optionKey: "A", sIdx: null });
                            setShowDiagramEditor(true);
                          }}
                        >
                          ✏️ Diagram
                        </button>
                      </div>
                    {renderDiagramPreview(partC.optionA.diagram, {
  section: "partC",
  qIdx: 0,
  optionKey: "A",
  sIdx: null,
})}
                    </div>
                  ) : (
                    <div>
                      <span style={{ fontWeight: "bold" }}>(a)</span>
                      <button className="no-print" style={{ marginLeft: "10px", fontSize: "11px", padding: "1px 6px", cursor: "pointer" }} onClick={() => addPartCSubQuestion("A")}>+ Add Sub Question</button>
                    </div>
                  )}
                </td>

                {partC.typeA === "single" ? (
                  <>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={partC.optionA.marks} onChange={(e) => handlePartCChange("A", "marks", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={partC.optionA.co} onChange={(e) => handlePartCChange("A", "co", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={partC.optionA.bl} onChange={(e) => handlePartCChange("A", "bl", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={partC.optionA.pi} onChange={(e) => handlePartCChange("A", "pi", e.target.value)} /></td>
                  </>
                ) : (
                  <td colSpan={4} style={{ background: "#fcfcfc" }}></td>
                )}
              </tr>

              {/* SUB QUESTIONS OPTION A */}
              {partC.typeA === "split" &&
                partC.optionA.subQuestions.map((sub, sIdx) => (
                  <tr key={`C_A_sub_${sIdx}`}>
                    <td style={{ padding: "6px", paddingLeft: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ fontWeight: "bold", marginRight: "6px" }}>{sub.label}</span>
                        <input
                          type="text"
                          style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                          value={sub.question}
                          onChange={(e) => { handlePartCSubChange("A", sIdx, "question", e.target.value); schedulePrediction(`partC-A-${sIdx}`, () => predictPartC("A", sIdx, e.target.value)); }}
                          onBlur={(e) => predictPartC("A", sIdx, e.target.value)}
                          onChange={(e) => handlePartCSubChange("A", sIdx, "question", e.target.value)}
                          placeholder={`Enter Sub Question ${sub.label}`}
                        />
                        <button
                          className="no-print btn-diagram"
                          onClick={() => {
                            setDiagramTarget({ section: "partC", qIdx: 0, optionKey: "A", sIdx });
                            setShowDiagramEditor(true);
                          }}
                        >
                          ✏️ Diagram
                        </button>
                        <button className="no-print" onClick={() => deletePartCSub("A", sIdx)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer" }}>🗑️</button>
                      </div>
                  {renderDiagramPreview(sub.diagram, {
  section: "partC",
  qIdx: 0,
  optionKey: "A",
  sIdx,
})}
                    </td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.marks} onChange={(e) => handlePartCSubChange("A", sIdx, "marks", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.co} onChange={(e) => handlePartCSubChange("A", sIdx, "co", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.bl} onChange={(e) => handlePartCSubChange("A", sIdx, "bl", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.pi} onChange={(e) => handlePartCSubChange("A", sIdx, "pi", e.target.value)} /></td>
                  </tr>
                ))}

              {/* OR ROW */}
              <tr>
                <td colSpan={6} align="center" style={{ fontWeight: "bold", background: "#f7fafc", padding: "4px" }}>
                  OR
                </td>
              </tr>

              {/* OPTION B */}
              <tr>
                <td align="center" rowSpan={partC.typeB === "single" ? 1 : partC.optionB.subQuestions.length + 1} style={{ padding: "6px", verticalAlign: "top" }}>
                </td>
                <td style={{ padding: "6px" }}>
                  <div className="no-print" style={{ marginBottom: "4px", fontSize: "10px", color: "#666" }}>
                    <strong>Option B Type:</strong>
                    <label style={{ marginLeft: "6px" }}><input type="radio" name="typeB_partC" checked={partC.typeB === "single"} onChange={() => togglePartCType("B", "single")} /> Single</label>
                    <label style={{ marginLeft: "6px" }}><input type="radio" name="typeB_partC" checked={partC.typeB === "split"} onChange={() => togglePartCType("B", "split")} /> Sub-Questions</label>
                  </div>

                  {partC.typeB === "single" ? (
                    <div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ fontWeight: "bold", marginRight: "6px" }}>(b)</span>
                        <input
                          type="text"
                          style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                          value={partC.optionB.question}
                          onChange={(e) => {
                            handlePartCChange("B", "question", e.target.value);
                            schedulePrediction("partC-B", () => predictQuestionMetadata(e.target.value).then((metadata) => {
                              setPartC((current) => current.optionB.question === e.target.value ? { ...current, optionB: { ...current.optionB, ...metadata } } : current);
                            }));
                          }}
                          onBlur={(e) => predictQuestionMetadata(e.target.value).then((metadata) => setPartC((current) => current.optionB.question === e.target.value ? { ...current, optionB: { ...current.optionB, ...metadata } } : current)).catch((error) => console.error("Question prediction failed:", error))}
                          onChange={(e) => handlePartCChange("B", "question", e.target.value)}
                          placeholder="Enter Part C Question 16 (b)"
                        />
                        <button
                          className="no-print btn-diagram"
                          onClick={() => {
                            setDiagramTarget({ section: "partC", qIdx: 0, optionKey: "B", sIdx: null });
                            setShowDiagramEditor(true);
                          }}
                        >
                          ✏️ Diagram
                        </button>
                      </div>
                  {renderDiagramPreview(partC.optionB.diagram, {
  section: "partC",
  qIdx: 0,
  optionKey: "B",
  sIdx: null,
})}
                    </div>
                  ) : (
                    <div>
                      <span style={{ fontWeight: "bold" }}>(b)</span>
                      <button className="no-print" style={{ marginLeft: "10px", fontSize: "11px", padding: "1px 6px", cursor: "pointer" }} onClick={() => addPartCSubQuestion("B")}>+ Add Sub Question</button>
                    </div>
                  )}
                </td>

                {partC.typeB === "single" ? (
                  <>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={partC.optionB.marks} onChange={(e) => handlePartCChange("B", "marks", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={partC.optionB.co} onChange={(e) => handlePartCChange("B", "co", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={partC.optionB.bl} onChange={(e) => handlePartCChange("B", "bl", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={partC.optionB.pi} onChange={(e) => handlePartCChange("B", "pi", e.target.value)} /></td>
                  </>
                ) : (
                  <td colSpan={4} style={{ background: "#fcfcfc" }}></td>
                )}
              </tr>

              {/* SUB QUESTIONS OPTION B */}
              {partC.typeB === "split" &&
                partC.optionB.subQuestions.map((sub, sIdx) => (
                  <tr key={`C_B_sub_${sIdx}`}>
                    <td style={{ padding: "6px", paddingLeft: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ fontWeight: "bold", marginRight: "6px" }}>{sub.label}</span>
                        <input
                          type="text"
                          style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "12px" }}
                          value={sub.question}
                          onChange={(e) => { handlePartCSubChange("B", sIdx, "question", e.target.value); schedulePrediction(`partC-B-${sIdx}`, () => predictPartC("B", sIdx, e.target.value)); }}
                          onBlur={(e) => predictPartC("B", sIdx, e.target.value)}
                          onChange={(e) => handlePartCSubChange("B", sIdx, "question", e.target.value)}
                          placeholder={`Enter Sub Question ${sub.label}`}
                        />
                        <button
                          className="no-print btn-diagram"
                          onClick={() => {
                            setDiagramTarget({ section: "partC", qIdx: 0, optionKey: "B", sIdx });
                            setShowDiagramEditor(true);
                          }}
                        >
                          ✏️ Diagram
                        </button>
                        <button className="no-print" onClick={() => deletePartCSub("B", sIdx)} style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer" }}>🗑️</button>
                      </div>
                   {renderDiagramPreview(sub.diagram, {
  section: "partC",
  qIdx: 0,
  optionKey: "B",
  sIdx,
})}
                    </td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.marks} onChange={(e) => handlePartCSubChange("B", sIdx, "marks", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.co} onChange={(e) => handlePartCSubChange("B", sIdx, "co", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.bl} onChange={(e) => handlePartCSubChange("B", sIdx, "bl", e.target.value)} /></td>
                    <td align="center" style={{ padding: "6px" }}><input style={{ width: "100%", border: "none", outline: "none", textAlign: "center" }} type="text" value={sub.pi} onChange={(e) => handlePartCSubChange("B", sIdx, "pi", e.target.value)} /></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="analysis-page" style={{ marginTop: "28px", pageBreakBefore: "always", breakBefore: "page" }}>
          <div className="analysis-charts">
            <div className="analysis-chart-column" style={{ order: 1 }}>
              <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "13px", marginBottom: "14px" }}>Course Outcome Wise Mark Distribution</div>
              <svg viewBox="0 0 430 270" role="img" aria-label="Course Outcome Wise Mark Distribution" style={{ width: "100%", height: "250px", overflow: "visible" }}>
                <text x="14" y="135" textAnchor="middle" fontSize="11" transform="rotate(-90 14 135)">Marks</text>
                {coChartTicks.map((tick) => { const y = 220 - (tick / coChartMaximum) * 190; return <g key={tick}><line x1="52" x2="420" y1={y} y2={y} stroke="#d9e0e8" /><text x="45" y={y + 4} textAnchor="end" fontSize="10" fill="#4a5568">{tick}</text></g>; })}
                <line x1="52" x2="420" y1="220" y2="220" stroke="#4a5568" />
                <line x1="52" x2="52" y1="30" y2="220" stroke="#4a5568" />
                {coDistribution.map((item, index) => { const x = 78 + index * 65; const height = (item.marks / coChartMaximum) * 190; const y = 220 - height; return <g key={item.label}><text x={x + 20} y={Math.max(21, y - 6)} textAnchor="middle" fontSize="10">{item.marks}</text><rect x={x} y={y} width="40" height={height} fill="#718096" /><text x={x + 20} y="240" textAnchor="middle" fontSize="10">{item.label}</text></g>; })}
              </svg>
            </div>
            <div className="analysis-chart-column" style={{ order: 2, textAlign: "center" }}>
              <div style={{ fontWeight: "bold", fontSize: "13px", marginBottom: "14px" }}>Bloom's Level Wise Mark Distribution</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <svg viewBox="0 0 200 200" role="img" aria-label="Bloom's Level Wise Mark Distribution" style={{ width: "min(240px, 65%)", height: "auto", flex: "0 1 240px" }}>
                  {bloomDistribution.filter((item) => item.marks > 0).map((item) => { const percent = totalQuestionMarks ? Math.round((item.marks / totalQuestionMarks) * 1000) / 10 : 0; return <g key={item.label}><path d={piePath(item)} fill={item.color} stroke="#fff" strokeWidth="1" />{percent > 0 && (() => { const labelPoint = piePoint((item.startAngle + item.endAngle) / 2, 52); return <text x={labelPoint.x} y={labelPoint.y + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff" stroke="#333" strokeWidth="0.5" paintOrder="stroke">{percent}%</text>; })()}</g>; })}
                  {!totalQuestionMarks && <circle cx="100" cy="100" r="78" fill="#e2e8f0" />}
                </svg>
                <div style={{ border: "1px solid #cbd5e0", padding: "10px 12px", textAlign: "left", fontSize: "11px", lineHeight: "1.9" }}>{bloomDistribution.map((item) => <div key={item.label}><i style={{ display: "inline-block", width: "10px", height: "10px", background: item.color, marginRight: "6px" }} />{item.label}</div>)}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}