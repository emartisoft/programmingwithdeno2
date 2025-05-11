import OpenAI from "openai";
import "@std/dotenv/load";
import { renderMarkdown } from "@littletof/charmd";

// Retrieve the API key from environment variables
const apiKey = Deno.env.get("GEMINI_API_KEY");
if (!apiKey) {
  console.error("API_KEY environment variable is not set!");
  Deno.exit(1);
}

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Process the user input and send it to the OpenAI API
const response = await openai.chat.completions.create({
  model: "gemini-2.5-flash-preview-04-17",
  messages: [
    { role: "system", content: "Explain like a mathematics teacher." },
    {
      role: "user",
      content: Deno.args[0] ||
        "One faucet alone can fill a pool in 6 hours, " +
          "while another can do it alone in 12 hours. " +
          "How long will it take for both faucets working together to fill the pool?",
    },
  ],
});

// Render the API response in Markdown format and print it to the console
console.log(
  renderMarkdown(
    response.choices[0].message.content?.toString() || "No response found.",
  ),
);
