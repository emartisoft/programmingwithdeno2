import connectMongo from "./db.ts";

async function findMongo() {
  const { db, client } = await connectMongo();
  try {
    const collection = db.collection("Kitaplar");
    const kitaplar = await collection.find().toArray();
    console.table(kitaplar, ["KitapAdi", "SayfaSayisi"]);
    const kitapBul = await collection
      .find({ KitapAdi: { $regex: "^Metres" } })
      .toArray();
    for (const kitap of kitapBul) {
      console.log(`${kitap.KitapAdi} page count: ${kitap.SayfaSayisi}`);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

findMongo();
