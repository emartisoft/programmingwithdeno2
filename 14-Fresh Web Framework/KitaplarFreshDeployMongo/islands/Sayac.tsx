import { useState } from "preact/hooks";

export default function Sayac() {
  const [count, setCount] = useState(99);

  return (
    <div data-island="Sayac" class="flex gap-8 py-6">
      <h2 class="text-3xl tabular-nums">Count: {count}</h2>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count - 1)}
      >
        -1
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count + 1)}
      >
        +1
      </button>
    </div>
  );
}
