import { kontrolEt } from "@emarti/tckontrol";

const tcNo = "11111111110"; // Example (invalid) TC number
const isValid = kontrolEt(tcNo);

console.log(`Is TC No valid? => ${isValid ? "Yes" : "No"}`); 