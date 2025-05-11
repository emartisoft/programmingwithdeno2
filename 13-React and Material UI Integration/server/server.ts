import { Application } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import { getLocalIP } from "./getip.ts";
import router from "./routes.ts";

const app = new Application();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

const ip: string = getLocalIP()[0];

if (ip.startsWith("Yerel")) {
  console.log(ip);
  Deno.exit();
}

console.log(`Server is running at http://${ip}:8000...`);

await app.listen({ hostname: ip, port: 8000 });
