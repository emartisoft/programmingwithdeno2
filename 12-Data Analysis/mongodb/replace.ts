import connectToDatabase from "./db.ts";

async function replaceMongo() {
  const { db, client } = await connectToDatabase();
  try {
    const collection = db.collection("Kitaplar");
    await collection.replaceOne(
      { KitapAdi: "Metres 2" },
      {
        KitapAdi: "Tutsak Gelin 2",
        SayfaSayisi: 777,
      },
    );
    console.log("Replacement successful");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

replaceMongo();
