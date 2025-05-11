import { GoogleGenerativeAI } from "@google/generative-ai";
import "@std/dotenv/load";

export const modelName = Deno.env.get("GEMINI_MODEL");
if (!modelName) {
  console.error("GEMINI_MODEL environment variable is not set!");
  Deno.exit(1);
}

const key = Deno.env.get("GEMINI_API_KEY");
if (!key) {
  console.error("GEMINI_API_KEY environment variable is not set!");
  Deno.exit(1);
}
export const apiKey: string = key;

export const initialInstruction = Deno.env.get("GEMINI_INITIAL_INSTRUCTION");
if (!initialInstruction) {
  console.error("GEMINI_INITIAL_INSTRUCTION environment variable is not set!");
  Deno.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: modelName });
