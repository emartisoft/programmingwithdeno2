import { createPartFromUri, createUserContent } from "@google/genai";
import * as geminiConfig from "./geminiconfig.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";

async function main(): Promise<void> {
  const filePath = "./files/istanbulu_dinliyorum.mp3";
  let fileData: Uint8Array;
  try {
    fileData = await Deno.readFile(filePath);
  } catch (err) {
    console.error(`File read error: ${filePath}`, err);
    Deno.exit(1);
  }

  const myfile = await geminiConfig.ai.files.upload({
    file: new Blob([fileData]),
    config: { mimeType: "audio/mp3" },
  });

  const response = await geminiConfig.ai.models.generateContent({
    model: geminiConfig.modelName ?? "gemini-2.0-flash",
    contents: createUserContent([
      createPartFromUri(myfile.uri ?? "", myfile.mimeType ?? ""),
      "Summarize the audio recording, identifying its main idea and key points. Please write in english when summarizing.",
    ]),
  });

  console.log(
    renderMarkdown(
      wrapAnsi(response.text ?? "", 100),
    ),
  );
}

await main();
