import { predictQuestion } from "./predictionService.js";

function getSuggestions(question) {
  const result = predictQuestion(question);

  return {
    suggestions: result.prediction,
  };
}

export { getSuggestions };