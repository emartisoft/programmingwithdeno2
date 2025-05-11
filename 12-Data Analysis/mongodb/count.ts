import connectMongo from "./db.ts";

async function countMongo() {
  const { db, client } = await connectMongo();
  const collection = db.collection("Kitaplar");
  const belgeSayisi = await collection.countDocuments();
  console.log(`Total document count: ${belgeSayisi}`);
  const belgeSayisi2 = await collection.countDocuments({ SayfaSayisi: 299 });
  console.log(`Total number of books with "SayfaSayisi = 299": ${belgeSayisi2}`);
  await client.close();
}

countMongo();
