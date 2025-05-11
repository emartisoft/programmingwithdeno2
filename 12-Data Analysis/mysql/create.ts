import clientmysql from "./db.ts";

await clientmysql.execute(`
CREATE TABLE IF NOT EXISTS \`Kitaplar\` (
\`ID\` INT AUTO_INCREMENT NOT NULL,
\`KitapAdi\` VARCHAR(250) NOT NULL,
\`SayfaSayisi\` INT NOT NULL,
CONSTRAINT \`PRIMARY\` PRIMARY KEY (\`ID\`)
);
`);

await clientmysql.execute("TRUNCATE TABLE `Kitaplar`");

const insertQuery = "INSERT INTO `Kitaplar` (`KitapAdi`, `SayfaSayisi`) VALUES";

const kitapListesi: [string, number][] = [
  ["Mor Salkımlı Sokak", 245],
  ["Mahkum", 323],
  ["Acıların Hükümdarı", 299],
  ["Seni Kaybedemem", 211],
  ["Metres 1", 345],
  ["Metres 2", 299],
  ["Bir Kibritle Yok Olmak", 189],
];

for (const [kitapAdi, sayfaSayisi] of kitapListesi) {
  await clientmysql.execute(
    `${insertQuery} ('${kitapAdi}', ${sayfaSayisi})`,
  );
}

console.log("Data inserted into 'Kitaplar' table.");

await clientmysql.close();
