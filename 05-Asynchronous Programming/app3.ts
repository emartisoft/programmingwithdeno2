const workerCount = 3;
const workers: Worker[] = [];
const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < workerCount; i++) {
  const worker = new Worker(new URL("./worker3.ts", import.meta.url).href, {
    type: "module",
    deno: { permissions: "inherit" },
  });

  worker.onmessage = (e) => {
    console.log(`Worker ${i} result:`, e.data);
    assignTask(worker);
  };

  worker.onerror = (e) => {
    console.error(`Worker ${i} error:`, e.message);
    worker.terminate();
  };

  workers.push(worker);
}

function assignTask(worker: Worker) {
  if (tasks.length > 0) {
    const task = tasks.shift();
    worker.postMessage(task);
  } else {
    worker.terminate();
  }
}

workers.forEach(assignTask);
