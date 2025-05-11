import { model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";
import { encodeBase64 } from "@std/encoding";
import mimetype from "mimetype";

async function fileToGenerativePart(path: string) {
  const data = await Deno.readFile(path);
  const mimeType: string = mimetype.lookup(path);
  return {
    inlineData: {
      data: encodeBase64(data),
      mimeType,
    },
  };
}

const imageParts = await Promise.all([
  fileToGenerativePart("./files/dino1.png"),
  fileToGenerativePart("./files/dino2.png"),
  fileToGenerativePart("./files/Zitlarin_Bulusmasi_English.pdf"),
]);

const prompt =
  "Who are the characters in the PDF titled “Zitlarin_Bulusmasi_English”? What is the story’s main theme?";

const result = await model.generateContent([prompt, ...imageParts]);

console.log(renderMarkdown(wrapAnsi(result.response.text(), 60)));
