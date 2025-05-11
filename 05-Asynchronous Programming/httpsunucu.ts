import { Application, Context } from "@oak/oak";

const app = new Application();

app.use(async (ctx: Context) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/99",
    );
    const jsonData = await response.json();
    ctx.response.body = "Hello from asynchronous Deno! JSON Title: " +
      jsonData.title;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = "Server error!";
    console.error("Middleware error:", error);
  }
});

console.log("Server is running at http://localhost:8000");

await app.listen({ port: 8000 });
