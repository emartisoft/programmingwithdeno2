import { apiKey, model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";
import { encodeBase64 } from "@std/encoding";
import mimetype from "mimetype";
import { FileState, GoogleAIFileManager } from "@google/generative-ai/server";
import { basename } from "@std/path";

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

async function uploadLargeFile(filePath: string): Promise<string> {
  const fileManager = new GoogleAIFileManager(apiKey);
  const mimeType: string = mimetype.lookup(filePath);
  console.log(renderMarkdown(`> Starting file upload...\x1b[1A`));

  const fileResponse = await fileManager.uploadFile(filePath, {
    displayName: basename(filePath),
    mimeType: mimeType,
  });

  let fileInfo = await fileManager.getFile(fileResponse.file.name);
  while (fileInfo.state !== FileState.ACTIVE) {
    console.log(renderMarkdown(`> _File state: ${fileInfo.state}_ \x1b[1A`));
    await new Promise((resolve) => setTimeout(resolve, 3000));
    fileInfo = await fileManager.getFile(fileResponse.file.name);
  }

  console.log(renderMarkdown(`> File is ready. URI: ${fileInfo.uri}\x1b[1A`));
  return fileInfo.uri;
}

async function fileUriToGenerativePart(path: string) {
  const mimeType: string = mimetype.lookup(path);
  return {
    fileData: {
      fileUri: await uploadLargeFile(path),
      mimeType,
    },
  };
}

const videoParts = await Promise.all([
  fileToGenerativePart("./files/hello_deno.mp4"),
  fileUriToGenerativePart("./files/video.mp4"),
]);

const prompt =
  "What operations are intended to be performed by the coding shown in the videos?";

const result = await model.generateContent([prompt, ...videoParts]);

console.log(renderMarkdown(wrapAnsi(result.response.text(), 60)));
