import { SOCKET_NAMESPACES } from "../constants/constants.js";
import * as helperFunction from "../commonFunctions/helperFuntions.js";
import * as socketFunction from "../commonFunctions/socketFunctions.js";

function onDisconnect() {
  const userId = this.userData._id.toString();
  socketFunction.userDisconnect(userId);
  helperFunction.removeUserSocketId(userId);
}

function setUserScoket() {
  const userId = this.userData._id.toString();
  helperFunction.setUserSocketId(userId, this.id);
}

const onUserConnect = (socket) => {
  eventRegister(socket);
  const userId = socket.userData._id.toString();
  setUserScoket.call(socket);
};

const eventRegister = (socket) => {
  socket.on("disconnect", onDisconnect);
};

function authorizeUser(socket, next) {
  const token = socket.handshake.query.token;
  if (!token) {
    const err = new Error('Authentication error: Token is not provided');
    err.data = { content: "Please retry later" };
    return next(err);
  }
  socket.userData = token;
  next();
}


export const initConnection = (io) => {
  io.of(SOCKET_NAMESPACES.SOCKET_SERVICE).use(authorizeUser).on("connection", onUserConnect);
};

export const pubSubSubscribe = (client, channel) => {
  client.subscribe(channel, (message) => {
    socketFunction.emitMessage(message.split(",")[0], message);
  });
};
