self.onmessage = (e: MessageEvent<number>) => {
  const task = e.data;
  try {
    if (typeof task !== "number") {
      throw new Error("Invalid task type");
    }
    const result = task * task;
    self.postMessage(result);
  } catch (error) {
    self.postMessage({ error: (error as Error).message });
  }
};
