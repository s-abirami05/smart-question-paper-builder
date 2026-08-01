import cleanText from "../utils/textCleaner.js";

function findBestMatch(question, rules, keyName) {
  const cleanedQuestion = cleanText(question);

  let bestMatch = null;
  let highestScore = 0;

  for (const rule of rules) {
    let score = 0;

    for (const keyword of rule.keywords) {
      if (cleanedQuestion.includes(keyword.toLowerCase())) {
        score++;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = rule[keyName];
    }
  }

  return bestMatch || "Not Predicted";
}

export { findBestMatch };