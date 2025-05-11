import { model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import wrapAnsi from "wrap-ansi";
import { DOMParser } from "@b-fuze/deno-dom";

async function fetchURLContent(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch URL content: ${response.statusText}`);
  }
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const bodyText = doc?.body?.textContent || "";
  return bodyText.replace(/<[^>]+>/g, " ");
}

const url = Deno.args[0];
if (!url) {
  console.error("Usage: deno run --allow-net --allow-env url_summary.ts <URL>");
  Deno.exit(1);
}

console.log(`Fetching content from URL: ${url}`);
let pageText = await fetchURLContent(url);
pageText = `Please summarize the following text:\n${pageText}`;

const result = await model.generateContent([pageText]);

console.log(
  renderMarkdown(
    wrapAnsi(result.response.text(), 100),
  ),
);
