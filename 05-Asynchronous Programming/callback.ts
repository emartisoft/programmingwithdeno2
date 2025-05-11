function readFileCallback(
  filePath: string,
  callback: (err: Error | null, data?: string) => void,
) {
  Deno.readTextFile(filePath)
    .then((data) => callback(null, data))
    .catch((err) => callback(err));
}

readFileCallback("./file.txt", (err, data) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("File content:\n", data);
  }
});
