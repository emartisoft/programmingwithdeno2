async function main(): Promise<void> {
  try {
    const response = await fetch("https://docs.deno.com/api/web/fetch");
    const text = await response.text();
    console.log(text.slice(0, 500));
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

main();
