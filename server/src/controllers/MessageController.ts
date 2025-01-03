import { Response } from "express";
import Message from "../models/MessageModel";
import File from "../models/FileModel";
import { errorResponse, successResponse } from "../utilities/response";
import { mkdirSync, renameSync } from "fs";

export const getMessages = async (request: any, response: Response) => {
  try {
    const receiverId = request.userId;
    const senderId = request.query.id;

    if (!receiverId || !senderId) {
      return errorResponse(response, "Error", "User ids are required.");
    }

    await Message.updateMany(
      {
        $or: [
          { sender_id: senderId, receiver_id: receiverId },
          { sender_id: receiverId, receiver_id: senderId },
        ],
        unread: true,
      },
      {
        $set: { unread: false },
      }
    );

    const messages = await Message.find({
      $or: [
        { sender_id: senderId, receiver_id: receiverId },
        { sender_id: receiverId, receiver_id: senderId },
      ],
    })
      .sort({ timestamp: 1 })
      .populate("sender_id", "id email name")
      .populate("receiver_id", "id email name");

    return successResponse(response, "Get messages successfully", messages);
  } catch (error) {
    return errorResponse(response, "Error", "Internal server error", 500);
  }
};

export const uploadFile = async (request: any, response: Response) => {
  try {
    if (!request.file) {
      return errorResponse(
        response,
        "Validation Error",
        "File is required.",
        400
      );
    }

    const date = Date.now();
    const fileDir = `uploads/files` + date;
    const fileName = fileDir + "/" + request.file.originalname;

    mkdirSync(fileDir, { recursive: true });
    renameSync(request.file.path, fileName);

    return successResponse(response, "Upload file successfully");
  } catch (error) {
    return errorResponse(response, "Error", "Internal server error", 500);
  }
};
