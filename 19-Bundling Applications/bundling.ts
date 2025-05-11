import * as esbuild from "esbuild";
import { denoPlugins } from "@luca/esbuild-deno-loader";

const files: string[] = ["file3.ts"];
const outdir: string = "outjs";

try {
  await esbuild.build({
    plugins: [...denoPlugins()],
    entryPoints: files,
    outdir: outdir,
    bundle: true,
    minify: false,
    format: "esm",
  });
  console.log("Bundling is completed");
} catch (error) {
  console.error("Error: " + error);
}

esbuild.stop();
