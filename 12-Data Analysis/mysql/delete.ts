import clientmysql from "./db.ts";

await clientmysql.execute(`DELETE FROM Kitaplar WHERE ?? = ?`, ["ID", 7]);
console.log("Kitap silindi.");

await clientmysql.close();
