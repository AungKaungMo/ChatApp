import { Server } from "http";
import { Server as SockerServer, Socket } from "socket.io";
import Message from "./src/models/MessageModel";

const socketSetup = (server: Server) => {
  const io = new SockerServer(server, {
    cors: {
      origin: process.env.ORIGIN || "*",
      methods: ["POST", "GET"],
      credentials: true,
    },
  });

  const userSocketMap = new Map<string, string>();

  const sendMessage = async (message: {
    sender_id: string;
    receiver_id: string;
    messageType: "text" | "file";
    content?: string;
  }) => {
    const senderSocketId = userSocketMap.get(message.sender_id);
    const receiverSocketId = userSocketMap.get(message.receiver_id);
    const messageCreated = await Message.create(message);

    const messageData = await Message.findById(messageCreated.id)
      .populate("sender_id", "id email firstName lastName image")
      .populate("receiver_id", "id email firstName lastName image");

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", messageData);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };

  const disconnect = (socket: Socket) => {
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;
    console.log("CONNECTEDGIND", socket);

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    }

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      disconnect(socket);
    });
  });
};

export default socketSetup;
