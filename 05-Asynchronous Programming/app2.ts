if (import.meta.main) {
  const numbers = Deno.args.map((arg) => Number(arg));
  if (numbers.length === 0 || numbers.some(isNaN)) {
    console.log(
      "Usage: deno run --allow-read --unstable-worker-options app2.ts <number1> <number2> …",
    );
    Deno.exit(1);
  }
  const workerUrl = new URL("./worker2.ts", import.meta.url).href;
  const worker = new Worker(workerUrl, {
    type: "module",
    deno: { permissions: "inherit" },
  });
  worker.onmessage = (e: MessageEvent) => {
    console.log("Result from worker:", e.data);
    worker.terminate();
  };
  worker.postMessage({ numbers });
}
