import { copy, exists } from "@std/fs";

const sourceExists = await exists("./kaynak.txt");

if (!sourceExists) {
  console.log("kaynak.txt file not found");
  Deno.exit(1);
}

await copy("kaynak.txt", "hedef.txt", { overwrite: true });
console.log("kaynak.txt file has been copied to hedef.txt");
