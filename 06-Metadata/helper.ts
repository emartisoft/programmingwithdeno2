export function someFunction() {
  console.log("Helper module URL:", import.meta.url);
  console.log("Is main module?:", import.meta.main);
  console.log("Main module URL from helper:", Deno.mainModule);
}
