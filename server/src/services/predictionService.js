import loadRule from "../utils/loadRules.js";
import { findBestMatch } from "./keywordEngine.js";

const coRules = loadRule("coRules.json");
const bloomRules = loadRule("bloomRules.json");
const piRules = loadRule("piRules.json");

function predictQuestion(question, subjectCode) {
  const normalizedSubjectCode = String(subjectCode || "").trim().toUpperCase();
  const coRulesToUse = normalizedSubjectCode
    ? coRules.filter((rule) => rule.subjectCode === normalizedSubjectCode)
    : [];
  const co = findBestMatch(question, coRulesToUse.flatMap((rule) =>
    Object.entries(rule.keywords).map(([co, keywords]) => ({ co, keywords }))
  ), "co");

  const bloomLevel = findBestMatch(
    question,
    bloomRules,
    "level"
  );

  const subjectPiRules = normalizedSubjectCode
    ? piRules.filter((rule) => rule.subjectCode === normalizedSubjectCode)
    : [];
  const genericPiRules = piRules.filter((rule) => !rule.subjectCode);
  const piRulesToUse = [...subjectPiRules, ...genericPiRules];
  const pi = findBestMatch(question, piRulesToUse, "pi");

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
