import { DB } from "https://deno.land/x/sqlite/mod.ts";
const db = new DB("./db/chinook.db");
const query =
  "SELECT CustomerId, FirstName, LastName FROM customers ORDER BY FirstName LIMIT 10;";

const result = db.query(query);
const columns = ["ID", "Ad", "Soyad"];
const jsonResult: Record<string, unknown>[] = [];
for (const row of result) {
  const obj: { [key: string]: unknown } = {};
  columns.forEach((col, idx) => {
    obj[col] = row[idx];
  });
  jsonResult.push(obj);
}
console.log(JSON.stringify(jsonResult, null, 2));
console.table(jsonResult, columns);
db.close();
