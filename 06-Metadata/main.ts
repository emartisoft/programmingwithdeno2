import { someFunction } from "./helper.ts";
console.log("Main module URL:", Deno.mainModule);
console.log("Is main module?:", import.meta.main);
someFunction();
