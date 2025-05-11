import { parse } from "@std/csv";

interface LogEntry {
  ID: string;
  "client IP": string;
  dtime: string;
}

async function findMaxClientCSV() {
  const fileContent = await Deno.readTextFile("./data.csv");
  const parsedData = await parse(fileContent, {
    columns: ["ID", "client IP", "dtime"],
  }) as Record<string, string>[];

  const data: LogEntry[] = parsedData.map((entry) => ({
    ID: entry.ID,
    "client IP": entry["client IP"],
    dtime: entry.dtime,
  }));

  const counts = new Map<string, number>();
  for (const entry of data) {
    const ip = entry["client IP"];
    counts.set(ip, (counts.get(ip) || 0) + 1);
  }

  let maxIP = "";
  let maxCount = 0;
  for (const [ip, count] of counts.entries()) {
    if (count > maxCount) {
      maxIP = ip;
      maxCount = count;
    }
  }

  console.log(`Client with the most requests: ${maxIP} (${maxCount} requests)`);
}

findMaxClientCSV();
