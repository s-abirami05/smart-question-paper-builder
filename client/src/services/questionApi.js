import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/question"
});


export const getQuestions = (id) =>
  API.get(`/${id}`);


export const addQuestion = (data) =>
  API.post("/add", data);


export const updateQuestion = (id,data) =>
  API.put(`/${id}`,data);


export const deleteQuestion = (id) =>
  API.delete(`/${id}`);