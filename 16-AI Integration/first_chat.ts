import { model } from "./gemini.ts";

const result = await model.generateContent([
  "How many planets are there in the Solar System? Can you provide details?",
]);

console.log(result.response.text());
