import { Hono } from "hono";
import * as Rpi from "@emarti/gpiopins";

const chip = new Rpi.GpioChip();
const gpio18 = chip.getLine(18);

gpio18.requestOutput("my-test-relay", Rpi.PinValue.High);

const app = new Hono();

app.get("/", async (c) => {
  const html = await Deno.readTextFile("./index.html");
  return c.html(html);
});

app.post("/toggle", async (c) => {
  const { state } = await c.req.json();
  console.log("Toggle state:", state);

  if (state === "ON") {
    gpio18.setValue(Rpi.PinValue.Low);
  } else {
    gpio18.setValue(Rpi.PinValue.High);
  }

  return c.json({
    message: `Backend function triggered with state ${state}.`,
  });
});

Deno.serve(app.fetch);
