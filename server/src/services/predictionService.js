import loadRule from "../utils/loadRules.js";
import { findBestMatch } from "./keywordEngine.js";

const coRules = loadRule("coRules.json").rules;
const bloomRules = loadRule("bloomRules.json").rules;
const piRules = loadRule("piRules.json").rules;

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