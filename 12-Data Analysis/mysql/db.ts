import { Client } from "https://deno.land/x/mysql/mod.ts";
import "jsr:@std/dotenv/load";

const host = Deno.env.get("HOST");
const database = Deno.env.get("DATABASE");
const mysqlPort: number = Number(Deno.env.get("MYSQL_PORT"));
const user = Deno.env.get("USER");
const password = Deno.env.get("PASSWORD");

const client = await new Client().connect({
  hostname: host,
  username: user,
  password: password,
  db: database,
  port: mysqlPort,
});

export default client;
