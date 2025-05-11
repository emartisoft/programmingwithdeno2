import { Handlers } from "$fresh/server.ts";
import { libcamera } from "@andrewiski/libcamera";
import { model } from "./gemini.ts";
import { renderMarkdown } from "@littletof/charmd";
import { encodeBase64 } from "@std/encoding";

async function fileToGenerativePart(path: string, mimeType: string) {
  const data = await Deno.readFile(path);
  return {
    inlineData: {
      data: encodeBase64(data),
      mimeType,
    },
  };
}

async function getDataUri(filePath: string, mimeType: string): Promise<string> {
  const data = await Deno.readFile(filePath);
  const base64Data = encodeBase64(data);
  return `data:${mimeType};base64,${base64Data}`;
}

export const handler: Handlers = {
  async GET(_req) {
    const timestamp = Date.now().toString();
    const capturedImage = `capture${timestamp}.jpg`;
    const pathCapturedImage = `./captured/${capturedImage}`;

    await libcamera.jpeg({
      config: { output: pathCapturedImage, nopreview: true },
    });

    while (true) {
      try {
        await Deno.stat(pathCapturedImage);
        break;
      } catch (e) {
        if (e instanceof Deno.errors.NotFound) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        } else {
          throw e;
        }
      }
    }

    const imageParts = await Promise.all([
      fileToGenerativePart(pathCapturedImage, "image/jpg"),
    ]);

    const prompt = "Could you describe what is happening in the image?";

    const result = await model.generateContent([prompt, ...imageParts]);

    const comment = renderMarkdown(result.response.text());

    const imageSrc = await getDataUri(pathCapturedImage, "image/jpeg");

    return new Response(
      JSON.stringify({ comment, imageSrc }),
      { headers: { "Content-Type": "application/json" } },
    );
  },
};
