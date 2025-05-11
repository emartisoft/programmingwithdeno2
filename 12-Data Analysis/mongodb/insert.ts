import connectMongo from "./db.ts";

async function insertMongo() {
  const { db, client } = await connectMongo();
  const kitapListesi: [string, number][] = [
    ["Mor Salkımlı Sokak", 245],
    ["Mahkum", 323],
    ["Acıların Hükümdarı", 299],
    ["Seni Kaybedemem", 211],
    ["Metres 1", 345],
    ["Metres 2", 299],
    ["Bir Kibritle Yok Olmak", 189],
  ];
  try {
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);
    if (!collectionNames.includes("Kitaplar")) {
      console.log("Collection ‘Kitaplar’ does not exist—creating it...");
      await db.createCollection("Kitaplar");
    } else {
      console.log("Collection ‘Kitaplar’ already exists.");
      Deno.exit();
    }
    const collection = db.collection("Kitaplar");
    for (const [kitapAdi, sayfaSayisi] of kitapListesi) {
      await collection.insertOne({
        KitapAdi: kitapAdi,
        SayfaSayisi: sayfaSayisi,
      });
    }
    console.log("Documents inserted into ‘Kitaplar’ collection.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

insertMongo();
