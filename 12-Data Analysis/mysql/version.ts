import clientmysql from "./db.ts";

const result = await clientmysql.query("SELECT VERSION()");

if (result && result.length > 0) {
  console.log("MySQL Version: " + result[0]["VERSION()"]);
}

await clientmysql.close();
