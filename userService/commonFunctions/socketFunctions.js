import { io, pubClient } from "../server.js";
import { SOCKET_NAMESPACES } from "../constants/constants.js";
import * as helperFunction from "./helperFuntions.js";

export const emitMessage = (channel, data) => {
  const target = io.of(SOCKET_NAMESPACES.SOCKET_SERVICE).to(channel);
  target.emit("message", data);
};

export const joinOrLeaveChannel = async (userId, channel, join = false) => {
  const socketId = await helperFunction.getUserSocketId(userId);
  const nsp = io.of(SOCKET_NAMESPACES.SOCKET_SERVICE);
  const socketToJoin = nsp.sockets.get(socketId);
  if (socketToJoin) {
    if (join) socketToJoin.join(`${channel}`);
    else socketToJoin.leave(`${channel}`);
  }
};

export const userDisconnect = async (userId) => {

};

export const pubSubPublish = (channel, data) => {
  pubClient.publish(channel, JSON.stringify(data));
};
