import { MongoClient } from "https://deno.land/x/mongo@v0.33.0/mod.ts";
import "jsr:@std/dotenv/load";

const hostname = Deno.env.get("HOST");
const database = Deno.env.get("DATABASE");
const mongoport: number = Number(Deno.env.get("MONGO_PORT"));
const user = Deno.env.get("USER");
const password = Deno.env.get("PASSWORD");

export const connectDb = async (): Promise<MongoClient | undefined> => {
  try {
    const clientmongo = new MongoClient();
    await clientmongo.connect({
      db: database,
      tls: false,
      servers: [
        {
          host: hostname,
          port: mongoport,
        },
      ],
      credential: {
        username: user,
        password: password,
        db: database,
        mechanism: "SCRAM-SHA-1",
      },
    });

    return clientmongo;
  } catch (_error) {
    console.error("Error: Unable to establish database connection");
  }
};

export const getBooks = async (clientmongo: MongoClient) => {
  let results = [{ KitapAdi: "No Data Retrieved", SayfaSayisi: 0 }];
  try {
    const db = clientmongo.database(database);
    const collection = db.collection("Kitaplar");
    results = await collection.find().toArray() as {
      KitapAdi: string;
      SayfaSayisi: number;
    }[];
  } catch (_error) {
    console.error("Error: Failed to fetch data from the collection");
  }

  return results;
};
