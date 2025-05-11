import "@std/dotenv/load";
import { GoogleGenAI, Modality } from "@google/genai";

export const modelName = Deno.env.get("GEMINI_MODEL2");
if (!modelName) {
  console.error("GEMINI_MODEL2 environment variable is not set!");
  Deno.exit(1);
}

export const apiKey = Deno.env.get("GEMINI_API_KEY");
if (!apiKey) {
  console.error("GEMINI_API_KEY environment variable is not set!");
  Deno.exit(1);
}

export const ai = new GoogleGenAI({ apiKey });

export async function generateResponse(promptText: string) {
  const response = await ai.models.generateContent({
    model: modelName || "gemini-2.0-flash-exp-image-generation",
    contents: [promptText],
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });
  return response;
}
