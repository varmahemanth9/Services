import app from "./app.js";
import http from "http";
// import { Server } from "socket.io";
// import { createAdapter } from "@socket.io/redis-adapter";
// import { client } from "./commonFunctions/redis.js";
// import { initConnection, initSubscribe } from "./controllers/socketController.js";

const port = process.env.PORT || 3030;
const server = http.createServer(app);

// const pubClient = client.client;
// const subClient = pubClient.duplicate();
// const io = new Server(server, {
//   path: "/external-api/socket/",
//   cors: {
//     origin: "*",
//   },
//   transports: ["websocket", "polling"],
// });
// io.adapter(createAdapter(pubClient, subClient));

// subClient.connect();
// export { io, pubClient };
// initConnection(io);
// initSubscribe(subClient);

server.listen(port, () => {
  console.info(`User Service Running On Port ${port} !`);
});
