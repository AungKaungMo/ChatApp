import { request, Response } from "express";
import { errorResponse, successResponse } from "../utilities/response";
import User from "../models/UserModel";
import Message from "../models/MessageModel";

export const searchContacts = async (request: any, response: Response) => {
  try {
    const { searchText } = request.body;
    if (!searchText)
      return errorResponse(response, "Error", "Search text is required.");

    const checkSearchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(checkSearchText, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: request.userId } },
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
    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender_id: request.userId }, { receiver_id: request.userId }],
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
                $eq: ["$sender_id", request.userId],
              },
              then: "$receiver_id",
              else: "$sender_id",
            },
          },
          lastMessageTime: { $first: "createdAt" },
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
                    { $eq: ["$model", "User"] },
                    { $eq: ["$model_id", "$$userId"] },
                  ],
                },
              },
            },
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
          email: "$contactInfo.email",
          name: "$contactInfo.name",
          imageUrl: "$image.url",
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
