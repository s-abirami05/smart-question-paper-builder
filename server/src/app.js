import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import semesterRoutes from "./routes/semesterRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import courseOutcomeRoutes from "./routes/courseOutcomeRoutes.js";
import syllabusRoutes from "./routes/syllabusRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/course-outcomes", courseOutcomeRoutes);

app.use("/api/departments", departmentRoutes);


app.use("/api/semesters", semesterRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/prediction", predictionRoutes);
app.get("/", (req,res)=>{
  res.send("Smart Question Paper Builder API Running");
});


export default app;