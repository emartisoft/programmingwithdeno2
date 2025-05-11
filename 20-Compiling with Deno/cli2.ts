const name = Deno.args[0] || "Deno!";
console.log(`Hello, ${name}!`);

try {
    await Deno.writeTextFile("hello.txt", `Hello, ${name}!`);
    console.log("Written to hello.txt as well.");
} catch (err) {
    console.error(err);
}

const names = Deno.readTextFileSync(import.meta.dirname + "/x.txt");
console.log(names);

for (const entry of Deno.readDirSync(import.meta.dirname + "/files")) {
    console.log("Name:", entry.name);
    console.log("Is File?:", entry.isFile);
    console.log("Is Directory?:", entry.isDirectory);
    console.log("Is Symlink?:", entry.isSymlink);
    console.log("--------------------------");
}

prompt("Press Enter to continue...");