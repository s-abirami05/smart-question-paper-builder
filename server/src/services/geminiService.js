import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export async function getPrediction(question, department, subject, coList) {
  const prompt = `
You are an NBA Accreditation Expert.

Department:
${department}

Subject:
${subject}

Course Outcomes:
${coList}

Bloom Levels:
BL1 - Remember
BL2 - Understand
BL3 - Apply
BL4 - Analyze
BL5 - Evaluate
BL6 - Create

Program Indicators:
PI1 - Engineering Knowledge
PI2 - Problem Analysis
PI3 - Design / Development of Solutions
PI4 - Investigation of Problems
PI5 - Modern Tool Usage

Question:
${question}

Return ONLY valid JSON in this format:

{
  "co":"CO1",
  "bloomLevel":"BL2",
  "pi":"PI2"
}
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(url, {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    let text =
      response.data.candidates[0].content.parts[0].text;

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);
  } catch (error) {
  console.log("========== GEMINI ERROR ==========");

  console.log(error.response?.data);

  console.log(error.message);

  throw new Error("Failed to predict using Gemini AI");
}
}