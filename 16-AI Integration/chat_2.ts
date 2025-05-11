import { model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";

const result = await model.generateContent([
  "How many planets are there in the Solar System? Can you provide details?",
]);
console.log(renderMarkdown(wrapAnsi(result.response.text(), 100)));
