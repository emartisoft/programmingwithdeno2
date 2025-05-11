import { MongoClient } from "https://deno.land/x/mongo@v0.33.0/mod.ts";
import "jsr:@std/dotenv/load";

const host = Deno.env.get("HOSTMONGO");
const database = Deno.env.get("DATABASEMONGO");
const port: number = Number(Deno.env.get("MONGODB_PORT"));
const username = Deno.env.get("USERMONGO");
const password = Deno.env.get("PASSWORDMONGO");

export async function connectMongo() {
  const client = new MongoClient();
  await client.connect({
    db: database,
    tls: false,
    servers: [
      {
        host: host,
        port: port,
      },
    ],
    credential: {
      username: username,
      password: password,
      db: database,
      mechanism: "SCRAM-SHA-1",
    },
  });

  const db = client.database(database);
  return { db, clientmongo: client };
}

export default connectMongo;
