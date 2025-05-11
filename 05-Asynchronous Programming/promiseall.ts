const files = ["file.txt", "file2.txt", "file3.txt"];
const promises = files.map((file) => Deno.readTextFile(file));

const results = await Promise.all(promises);
console.log(results);
