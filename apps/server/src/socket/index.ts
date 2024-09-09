import { Server } from "socket.io";
import http from "http";
import express from "express";

/*
  -- initialize the express engine --
*/
const app = express();

const server = http.createServer(app);
const io = new Server(server);

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: { [key: string]: string } = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;

  if (userId) userSocketMap[userId] = socket.id;

  /*
    -- io.emit() is used to send events to all the connected clients --
  */
  io.emit("get_online_users", Object.keys(userSocketMap));

  /*
    -- socket.on() is used to listen to the events. can be used both on client and server side --
  */
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
