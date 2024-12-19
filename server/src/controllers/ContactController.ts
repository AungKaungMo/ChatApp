import { request, Response } from "express";
import { errorResponse, successResponse } from "../utilities/response";
import User from "../models/UserModel";
import Message from "../models/MessageModel";
import mongoose from "mongoose";
import File from "../models/FileModel";

export const searchContacts = async (request: any, response: Response) => {
  try {
    const { searchText } = request.body;
    const userId = new mongoose.Types.ObjectId(request.userId);
    if (!searchText)
      return errorResponse(response, "Error", "Search text is required.");

    const checkSearchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(checkSearchText, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: userId } },
        {
          $or: [{ name: regex }, { email: regex }],
        },
      ],
    });
    return successResponse(response, "Get contacts successfully.", contacts);
  } catch (error) {
    return errorResponse(response, "Error", "Internal server error", 500);
  }
};

export const getFriendContacts = async (request: any, response: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(request.userId);
    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender_id: userId }, { receiver_id: userId }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: {
                $eq: ["$sender_id", userId],
              },
              then: "$receiver_id",
              else: "$sender_id",
            },
          },
          lastMessageTime: { $first: "$createdAt" },
          lastMessageText: { $first: "$content" },
          unread: { $first: "$unread" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $lookup: {
          from: "files",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$model", "Users"] },
                    { $eq: ["$model_id", "$$userId"] },
                  ],
                },
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
          ],
          as: "image",
        },
      },
      {
        $unwind: {
          path: "$image",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          lastMessageText: 1,
          unread: 1,
          email: "$contactInfo.email",
          name: "$contactInfo.name",
          imageUrl: { $ifNull: ["$image.url", null] },
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    return successResponse(response, "Get contacts successfully.", contacts);
  } catch (error) {
    return errorResponse(response, "Error", "Internal server error", 500);
  }
};

export const getFriendDetail = async (request: any, response: Response) => {
  try {
    const receiverId = request.params.id;

    if (!receiverId)
      return errorResponse(
        response,
        "Validation Error",
        "Receiver Id is required.",
        400
      );

    const user = await User.findOne({ _id: receiverId });

    if (!user)
      return errorResponse(
        response,
        "Error",
        "User not found with that id.",
        400
      );

    const userWithImage = await File.findOne({
      model: "Users",
      model_id: receiverId,
    });

    const data = {
      _id: user._id,
      email: user.email,
      name: user.name,
      imageUrl: userWithImage?.url,
    };

    return successResponse(response, "Get user detail successfully.", data);
  } catch (error) {
    return errorResponse(response, "Error", "Internal server error", 500);
  }
};
// export const frientRequestSend = async (request: any, response: Response) => {
//   try {
//     const { request_friend_id } = request.body;

//   } catch (error) {

//   }
// }
