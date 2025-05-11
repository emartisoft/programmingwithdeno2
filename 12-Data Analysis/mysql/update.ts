import clientmysql from "./db.ts";

await clientmysql.execute(
  `UPDATE Kitaplar SET KitapAdi = 'Metres' WHERE ID = 5`,
);
console.log("Kitap adı güncellendi.");

await clientmysql.execute(`UPDATE Kitaplar SET ?? = ? WHERE ID = 7`, [
  "SayfaSayisi",
  666,
]);
console.log("Kitap sayfa sayısı güncellendi.");

await clientmysql.close();
