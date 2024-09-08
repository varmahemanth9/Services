import { SOCKET_NAMESPACES } from "../constants/constants.js";
import { client } from "./redis.js";
import crypto from 'crypto';

export function generateOTP() {
  return crypto.randomInt(1000, 9999).toString(); // Generates a 4-digit random OTP
}

export const setUserSocketId = (userId, socketId) => {
  return client.setKey(`${SOCKET_NAMESPACES.SOCKET_SERVICE?.split("/")?.[1]}${userId}`, socketId);
};

export const removeUserSocketId = (userId) => {
  return client.delKey(`${SOCKET_NAMESPACES.SOCKET_SERVICE?.split("/")?.[1]}${userId}`);
};

export const getUserSocketId = (userId) => {
  return client.getKey(`${SOCKET_NAMESPACES.SOCKET_SERVICE?.split("/")?.[1]}${userId}`);
};
