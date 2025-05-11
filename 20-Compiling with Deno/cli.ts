const name = Deno.args[0] || "Deno!";
console.log(`Hello, ${name}!`);

try {
    await Deno.writeTextFile(`hello.txt`, `Hello, ${name}!`);
    console.log("Written to hello.txt as well.");
} catch (err) {
    console.error(err);
}

prompt("Press Enter to continue...");