import { Router } from "@oak/oak";
import {
  getKitaplarFromMongodb,
  getKitaplarFromMysql,
  info,
} from "./controller.ts";

const router = new Router();

router
  .get("/", info)
  .get("/mysqldata", getKitaplarFromMysql)
  .get("/mongodata", getKitaplarFromMongodb);

export default router;
