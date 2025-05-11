import clientmysql from "./db.ts";

const result = await clientmysql.query("SELECT * FROM `Kitaplar`");

console.log(result);
console.table(result);

await clientmysql.close();
