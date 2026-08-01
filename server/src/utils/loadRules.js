import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadRule(fileName) {
  const filePath = path.join(
    __dirname,
    "..",
    "prediction-rules",
    fileName
  );

  const data = fs.readFileSync(filePath, "utf8");

  return JSON.parse(data);
}

export default loadRule;