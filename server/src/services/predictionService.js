import loadRule from "../utils/loadRules.js";
import { findBestMatch } from "./keywordEngine.js";

const coRules = loadRule("coRules.json");
const bloomRules = loadRule("bloomRules.json");
const piRules = loadRule("piRules.json");

function predictQuestion(question) {
  const co = findBestMatch(question, coRules, "co");

  const bloomLevel = findBestMatch(
    question,
    bloomRules,
    "level"
  );

  const pi = findBestMatch(question, piRules, "pi");

  return {
    question,
    prediction: {
      co,
      bloomLevel,
      pi,
    },
  };
}

export { predictQuestion };