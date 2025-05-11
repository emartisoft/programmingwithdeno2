import { initialInstruction, model, modelName } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";

const chatHistory: string[] = [];
const columnWidth = 80;

const brailleSpinner = [
  "\u280B",
  "\u2819",
  "\u2839",
  "\u2838",
  "\u283C",
  "\u2834",
  "\u282E",
  "\u282F",
  "\u2807",
  "\u280F",
];

function buildPrompt(history: string[]): string {
  return `${initialInstruction}\n${history.join("\n")}\nAI:`;
}

console.log("");
console.log(
  renderMarkdown(
    `> _Hello! I am a text-based AI assistant.
    Gemini model variant: \`${modelName}\`
    Chat application started. To exit, submit an empty input._`,
  ),
);

(async () => {
  while (true) {
    const userInput = prompt(renderMarkdown("## *` You `*"));
    if (userInput === null || userInput.trim() === "") {
      console.log(renderMarkdown("> _Exiting..._"));
      break;
    }

    chatHistory.push(`User: ${userInput}`);
    const promptText = buildPrompt(chatHistory);

    let index = 0;
    const spinner = setInterval(() => {
      const frame = brailleSpinner[index % brailleSpinner.length];
      Deno.stdout.write(
        new TextEncoder().encode(
          renderMarkdown(`? **_Thinking_ ${frame}**\x1B[A\r`),
        ),
      );
      index++;
    }, 100);

    try {
      const result = await model.generateContent([promptText]);
      const assistantReply = await result.response.text();

      clearInterval(spinner);
      Deno.stdout.write(new TextEncoder().encode("\r"));

      console.log(" ".repeat(columnWidth));
      console.log(renderMarkdown("## *` AI `*"));
      console.log("\x1B[A\x1B[A\r");
      console.log(renderMarkdown(wrapAnsi(assistantReply, columnWidth)));

      chatHistory.push(`AI: ${assistantReply}`);
    } catch (error) {
      clearInterval(spinner);
      Deno.stdout.write(new TextEncoder().encode("\r"));
      console.error("Error occurred:", error);
    }
  }
})();
