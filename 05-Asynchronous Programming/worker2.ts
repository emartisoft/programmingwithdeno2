self.onmessage = (e: MessageEvent) => {
  const { numbers } = e.data as { numbers: number[] };
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  self.postMessage(sum);
  self.close();
};
