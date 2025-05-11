const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("input.txt");
const text = decoder.decode(data);
console.log("Data read from file:", text);

const encoder = new TextEncoder();
const newText = text.toUpperCase();
const newData = encoder.encode(newText);
await Deno.writeFile("output.txt", newData);
console.log("Data written to 'output.txt'.");
