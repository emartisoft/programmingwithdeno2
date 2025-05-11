import connectMongo from "./db.ts";

async function aggregateMongo() {
  const { db, client } = await connectMongo();
  try {
    const collection = db.collection("Kitaplar");
    const result = await collection.aggregate([
      {
        $group: {
          _id: null,
          totalPageCount: { $sum: "$SayfaSayisi" },
        },
      },
    ]).toArray();
    console.log("Total Page Count:", result[0].totalPageCount);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

aggregateMongo();
