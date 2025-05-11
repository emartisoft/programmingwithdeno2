import connectMongo from "./db.ts";

async function updateMongo() {
  const { db, client } = await connectMongo();
  try {
    const collection = db.collection("Kitaplar");
    await collection.updateOne(
      { KitapAdi: "Metres 1" },
      { $set: { KitapAdi: "Tutsak Gelin 1" } },
    );
    console.log("Update successful");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

updateMongo();
