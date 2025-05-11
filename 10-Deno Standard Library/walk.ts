import { walk } from "@std/fs";

async function listFiles() {
  const rootDir = "./";
  try {
    for await (
      const entry of walk(rootDir, {
        match: [/\.txt$/],
        maxDepth: 2,
      })
    ) {
      console.log(`Found path: ${entry.path}, Is file?: ${entry.isFile}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

listFiles();
