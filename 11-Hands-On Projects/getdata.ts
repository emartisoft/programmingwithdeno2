import { DB } from "https://deno.land/x/sqlite/mod.ts";
export function getDataFromDatabase(): Array<{ [key: string]: any }> {
  const db = new DB("./db/chinook.db");
  const query = "SELECT CustomerId, FirstName, LastName FROM customers;";
  const result = db.query(query);
  const columns = ["ID", "FirstName", "LastName"];

  const jsonResult: Array<{ [key: string]: any }> = [];
  for (const row of result) {
    const obj: { [key: string]: any } = {};
    columns.forEach((col, idx) => {
      obj[col] = row[idx];
    });
    jsonResult.push(obj);
  }
  db.close();
  return jsonResult;
}
export default getDataFromDatabase;
