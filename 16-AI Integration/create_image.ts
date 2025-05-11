import * as geminiConfig from "./geminiconfig.ts";

async function main() {
  const promptText =
    "Create an image focused on a full glass tea cup on a table, "
    + "with the Istanbul Maiden's Tower and Bosphorus view in the background.";

  const response = await geminiConfig.generateResponse(promptText);

  const parts = response.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData?.data) {
      const imageData = part.inlineData.data;
      const binary = atob(imageData);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const filename = "create_image.png";
      await Deno.writeFile(filename, bytes);
      console.log(`Image file created: ${filename}`);
    }
  }
}

if (import.meta.main) {
  main();
}
