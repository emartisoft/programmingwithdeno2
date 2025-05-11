import { MongoClient } from "https://deno.land/x/mongo@v0.33.0/mod.ts";
import "jsr:@std/dotenv/load";

const host = Deno.env.get("HOST");
const database = Deno.env.get("DATABASE");
const port: number = Number(Deno.env.get("MONGODB_PORT"));
const username = Deno.env.get("USER");
const password = Deno.env.get("PASSWORD");

async function connectMongo() {
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
  return { db, client };
}

export default connectMongo;
