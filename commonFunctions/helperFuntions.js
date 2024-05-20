import { SOCKET_NAMESPACES } from "../constants/constants.js";
import { client } from "./redis.js";

export const setUserSocketId = (userId, socketId) => {
  return client.setKey(`${SOCKET_NAMESPACES.SOCKET_SERVICE?.split("/")?.[1]}${userId}`, socketId);
};

export const removeUserSocketId = (userId) => {
  return client.delKey(`${SOCKET_NAMESPACES.SOCKET_SERVICE?.split("/")?.[1]}${userId}`);
};

export const getUserSocketId = (userId) => {
  return client.getKey(`${SOCKET_NAMESPACES.SOCKET_SERVICE?.split("/")?.[1]}${userId}`);
};
