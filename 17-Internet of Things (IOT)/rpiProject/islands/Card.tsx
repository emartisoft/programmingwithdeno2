import { useState } from "preact/hooks";

export default function Card() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    comment: "No comment yet.",
    imageSrc: "/images/null.jpg",
  });

  async function handleCapture() {
    setLoading(true);
    try {
      const res = await fetch("/api/capture");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        console.error("Error occurred in capture request.");
      }
    } catch (err) {
      console.error("Request error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div class="flex flex-col items-center justify-center min-h-screen">
        <div class="card shadow-lg p-4 rounded-md">
          <img
            src={data.imageSrc}
            alt="Captured"
            class="w-96 h-96 object-cover mb-4"
          />
          <p class="w-96 text-center break-words whitespace-normal">
            {data.comment}
          </p>
        </div>
        <button
          type="button"
          onClick={handleCapture}
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Capture Image
        </button>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-2xl">
            Please wait while the process is ongoing...
          </div>
        </div>
      )}
    </div>
  );
}
