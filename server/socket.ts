import { Server } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import Message from "./src/models/MessageModel";
interface MessageType {
  message: {
    sender_id: string;
    receiver_id: string;
    messageType: "text" | "file";
    content?: string;
  };
  userId: string;
}
const socketSetup = (server: Server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: process.env.ORIGIN || "*",
      methods: ["POST", "GET"],
      credentials: true,
    },
  });

  const userSocketMap = new Map<string, string>();

  const sendMessage = async ({ message, userId }: MessageType) => {
    const senderSocketId = userSocketMap.get(message.sender_id);
    const receiverSocketId = userSocketMap.get(message.receiver_id);
    const messageCreated = await Message.create(message);

    const messageData = await Message.findById(messageCreated.id)
      .populate("sender_id", "id email name image")
      .populate("receiver_id", "id email name image");

    await Message.updateMany(
      {
        $or: [
          { sender_id: message.sender_id, receiver_id: message.receiver_id },
          { sender_id: message.receiver_id, receiver_id: message.sender_id },
        ],
        unread: true,
      },
      {
        $set: { unread: false },
      }
    );

    // const newChatMessage = await Message.find({
    //   sender_id: message.sender_id,
    //   receiver_id: message.receiver_id,
    // });

    // let isTrue = newChatMessage && newChatMessage.length === 1;

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("recieveMessage", messageData);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
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

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    }

    socket.on("checkIfActive", (userId: string, callback) => {
      const isActive = userSocketMap.has(userId);
      callback(isActive);
    });

    socket.on("sendMessage", async (message, callback) => {
      try {
        await sendMessage({ message, userId });
        callback({ success: true, message: "Message sent successfully." });
      } catch (error: any) {
        callback({ success: false, message: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      disconnect(socket);
    });
  });
};

export default socketSetup;
