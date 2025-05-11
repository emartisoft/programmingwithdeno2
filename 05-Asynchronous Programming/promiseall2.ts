// promiseall2.ts
async function fetch10(): Promise<string> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/10",
  );
  const data = await response.json();
  return data.title;
}
async function fetch11(): Promise<string> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/11",
  );
  const data = await response.json();
  return data.title;
}
async function fetchAllData() {
  try {
    const [title10, title11] = await Promise.all([fetch10(), fetch11()]);
    console.log("Post 10 Title:", title10);
    console.log("Post 11 Title:", title11);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchAllData();
