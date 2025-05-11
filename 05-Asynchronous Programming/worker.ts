self.onmessage = (e: MessageEvent) => {
  console.log("Worker received message from main thread:", e.data);
  self.postMessage({ result: "Message received!" });
  self.close();
};
