async function readFileAsync(filePath: string) {
  try {
    const data = await Deno.readTextFile(filePath);
    console.log("File contents:\n", data);
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

readFileAsync("./file.txt");
