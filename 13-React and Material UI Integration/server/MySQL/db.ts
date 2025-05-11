import { Client } from "https://deno.land/x/mysql/mod.ts";
import "jsr:@std/dotenv/load";

const host = Deno.env.get("HOSTMYSQL");
const database = Deno.env.get("DATABASEMYSQL");
const port: number = Number(Deno.env.get("MYSQL_PORT"));
const user = Deno.env.get("USERMYSQL");
const password = Deno.env.get("PASSWORDMYSQL");

const clientmysql = await new Client().connect({
  hostname: host,
  username: user,
  password: password,
  db: database,
  port: port,
});

export default clientmysql;
