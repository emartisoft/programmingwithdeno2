import { Application } from "@oak/oak";

if (import.meta.main) {
  const app = new Application();
  app.use((ctx) => {
    ctx.response.body = "Oak module path: " + import.meta.resolve("@oak/oak");
  });
  app.listen({ port: 8000 });
}
