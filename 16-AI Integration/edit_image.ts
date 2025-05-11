import * as geminiConfig from "./geminiconfig.ts";
import { Modality } from "npm:@google/genai";
import { encodeBase64 as base64Encode } from "jsr:@std/encoding";

async function main() {
  const imagePath = "./create_image.png";
  const raw = await Deno.readFile(imagePath);
  const base64Image = base64Encode(raw);

  const contents = [
    {
      text: "Add a flying seagull to the image.",
    },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];

  const response = await geminiConfig.ai.models.generateContent({
    model: geminiConfig.modelName || "gemini-2.0-flash-exp-image-generation",
    contents,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData?.data) {
      const data = part.inlineData.data;
      const binary = atob(data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const outFile = "./edited-image.png";
      await Deno.writeFile(outFile, bytes);
      console.log(`Image saved after editing: ${outFile}`);
    }
  }
}

if (import.meta.main) {
  main();
}
