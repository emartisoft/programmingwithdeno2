import connectToDatabase from "./db.ts";

async function deleteMongo() {
  const { db, client } = await connectToDatabase();
  try {
    const collection = db.collection("Kitaplar");
    await collection.deleteOne({ KitapAdi: "Metres 1" });
    await collection.deleteMany({ KitapAdi: "Metres 2" });
    console.log("Deletion operations completed successfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

deleteMongo();
