import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/question"
});

// Get Questions
export const getQuestions = () => API.get("/");

// Add Question
export const addQuestion = (data) => API.post("/", data);

// Update Question
export const updateQuestion = (id, data) =>
  API.put(`/${id}`, data);

// Delete Question
export const deleteQuestion = (id) =>
  API.delete(`/${id}`);

export default API;