Deno.serve((req) => {
  if (req.headers.get("upgrade") !== "websocket") {
    return new Response("WebSocket connection expected", { status: 501 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.onopen = () => {
    console.log("A client has connected.");
  };

  socket.onmessage = (event) => {
    console.log(`Received message: ${event.data}`);
    if (event.data === "Bond") {
      socket.send("James Bond");
    }
  };

  socket.onclose = () => {
    console.log("Client connection closed.");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return response;
});
