import connectMongo from "./db.ts";

async function showVersion() {
  const { db, client } = await connectMongo();
  try {
    const buildInfo = await db.runCommand({ buildInfo: 1 });
    console.log("MongoDB Version:", buildInfo.version);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

showVersion();
