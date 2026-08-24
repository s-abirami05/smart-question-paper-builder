import axios from "axios";


const API_URL = "http://localhost:5000/api/semesters";


// Get all semesters

export const getSemesters = async () => {

    const response = await axios.get(API_URL);

    return response.data;

};