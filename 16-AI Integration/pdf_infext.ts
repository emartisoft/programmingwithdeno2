import { model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";
import { encodeBase64 } from "@std/encoding";

async function fileToGenerativePart(path: string, mimeType: string) {
  const data = await Deno.readFile(path);
  return {
    inlineData: {
      data: encodeBase64(data),
      mimeType,
    },
  };
}

const imageParts = await Promise.all([
  fileToGenerativePart("./files/dino1.png", "image/png"),
  fileToGenerativePart("./files/dino2.png", "image/png"),
  fileToGenerativePart("./files/Zitlarin_Bulusmasi_English.pdf", "application/pdf"),
]);

//const prompt = "What are the differences between the dinosaurs in the images?";
const prompt =
  "Who are the characters in the PDF titled “Zitlarin_Bulusmasi_English”? What is the story’s main theme?";

const result = await model.generateContent([prompt, ...imageParts]);

console.log(renderMarkdown(wrapAnsi(result.response.text(), 60)));
