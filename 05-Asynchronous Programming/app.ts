const workerUrl = new URL("./worker.ts", import.meta.url).href;
const worker = new Worker(workerUrl, {
  type: "module",
});
worker.postMessage({ message: "Hello, worker!" });
worker.onmessage = (e: MessageEvent) => {
  console.log("Main thread received message from worker:", e.data);
};
