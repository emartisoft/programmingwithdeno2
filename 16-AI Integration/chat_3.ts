import { model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";

(async () => {
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
    const result = await model.generateContent([
      Deno.args[0] ||
      "How many planets are there in the Solar System? Can you provide details?",
    ]);

    clearInterval(spinner);
    Deno.stdout.write(new TextEncoder().encode("\r"));

    console.log(
      renderMarkdown(
        wrapAnsi(result.response.text(), 100),
      ),
    );
  } catch (error) {
    clearInterval(spinner);
    Deno.stdout.write(new TextEncoder().encode("\r"));
    console.error(error);
  }
})();
