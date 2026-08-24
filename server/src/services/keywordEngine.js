import cleanText from "../utils/textCleaner.js";

function wordMatches(questionWord, keywordWord) {
  if (questionWord === keywordWord) return true;

  const normalizeWord = (word) => {
    if (word.endsWith("ies")) return `${word.slice(0, -3)}y`;
    if (word.endsWith("ing") && word.length > 5) return word.slice(0, -3);
    if (word.endsWith("ed") && word.length > 4) return word.slice(0, -2);
    if (word.endsWith("es") && word.length > 4) return word.slice(0, -2);
    if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
    return word;
  };

  const singular = (word) => {
    if (word.endsWith("ies")) return `${word.slice(0, -3)}y`;
    if (word.endsWith("ses")) return word.slice(0, -2);
    if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
    return word;
  };

  return (
    normalizeWord(questionWord) === normalizeWord(keywordWord) ||
    singular(questionWord) === singular(keywordWord)
  );
}

function containsKeyword(questionWords, keyword) {
  const keywordWords = keyword.split(" ");

  for (
    let start = 0;
    start <= questionWords.length - keywordWords.length;
    start += 1
  ) {
    const matches = keywordWords.every((keywordWord, offset) =>
      wordMatches(questionWords[start + offset], keywordWord)
    );

    if (matches) return true;
  }

  return false;
}

function findBestMatch(question, rules, keyName, fallbackValue = "") {
  const cleanedQuestion = cleanText(question);
  const questionWords = cleanedQuestion.split(" ").filter(Boolean);

  const normalizedRules = Array.isArray(rules)
    ? rules
    : Object.entries(rules).map(([label, keywords]) => ({
        [keyName]: label,
        keywords,
      }));

  let bestMatch = null;
  let highestScore = 0;

  for (const rule of normalizedRules) {
    const keywords = rule.keywords || [];

    let bestKeywordScore = 0;
    let matchedKeywordCount = 0;

    for (const keyword of keywords) {
      const normalizedKeyword = cleanText(keyword);

      if (!normalizedKeyword) continue;

      if (containsKeyword(questionWords, normalizedKeyword)) {
        const keywordScore = normalizedKeyword.split(" ").length;

        bestKeywordScore = Math.max(
          bestKeywordScore,
          keywordScore
        );

        matchedKeywordCount += 1;
      }
    }

    // Prefer specific phrases over generic keywords
    const score =
      bestKeywordScore * 1000 + matchedKeywordCount;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = rule[keyName];
    }
  }

  return bestMatch || fallbackValue;
}

export { findBestMatch };