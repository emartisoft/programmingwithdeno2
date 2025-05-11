Deno.readTextFile("./file.txt")
  .then((data) => {
    console.log("File contents:\n", data);
  })
  .catch((error) => {
    console.error("Error reading file:", error);
  });
