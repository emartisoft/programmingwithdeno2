const ws = new WebSocket("ws://localhost:8000");

ws.onopen = () => {
  console.log("Connected to the server.");
  ws.send("Bond");
};

ws.onmessage = (event) => {
  console.log(`Message from server: ${event.data}`);
  if (event.data === "James Bond") {
    console.log("Received 'James Bond' response from server.");
  }
};

ws.onerror = (error) => {
  if (error instanceof ErrorEvent) {
    console.error(`WebSocket error: ${error.message}`);
  } else {
    console.error("Unknown error");
  }
};

ws.onclose = () => {
  console.log("Connection closed.");
};
