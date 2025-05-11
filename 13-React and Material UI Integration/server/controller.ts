import { Context } from "@oak/oak";
import clientmysql from "./MySQL/db.ts";
import connectMongo from "./MongoDB/db.ts";

export const info = (context: Context) => {
  context.response.body = "Endpoints for fetching data from databases:\n" +
    "MySQL  :    /mysqldata\n" +
    "MongoDB:    /mongodata";
};

export const getKitaplarFromMysql = async (context: Context) => {
  const results = await clientmysql.query("SELECT * FROM Kitaplar");
  context.response.body = results;
};

export const getKitaplarFromMongodb = async (context: Context) => {
  const { db, clientmongo } = await connectMongo();
  const collection = db.collection("Kitaplar");
  const results = await collection.find().toArray();
  context.response.body = results;
  clientmongo.close();
};
