// url
console.log("%cimport.meta.url", "color: green");
console.log(import.meta.url);

// main
console.log("%cimport.meta.main", "color: green");
if (import.meta.main) {
  console.log("This module was run as the main module.");
}

// resolve
console.log("%cimport.meta.resolve", "color: green");
console.log(import.meta.resolve("./test.ts"));

// filename
console.log("%cimport.meta.filename", "color: green");
console.log("Filename:", import.meta.filename);

// dirname
console.log("%cimport.meta.dirname", "color: green");
console.log("Directory:", import.meta.dirname);

// Finding basename and dirname via url
console.log("%cFinding basename and dirname via url", "color: green");
const url = new URL(import.meta.url);
const path = url.pathname;
const basename = path.split("/").pop();
const dir = path.substring(0, path.lastIndexOf("/"));
console.log(basename, dir);
