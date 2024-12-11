import { Request, Response } from "express";
import User from "../models/UserModel";
import { createToken } from "../utilities/token";
import { compare } from "bcrypt";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../schema/AuthSchema";
import { z } from "zod";
import { formatZodErrors } from "../utilities/zod-error-format";
import { errorResponse, successResponse } from "../utilities/response";
import { renameSync, unlinkSync } from "fs";
import File from "../models/FileModel";

const maxAge = 3 * 24 * 60 * 60 * 1000;

/**
 * Utility function to send a JWT cookie
 */
const sendTokenCookie = (
  response: Response,
  email: string,
  userId: string
): void => {
  const token = createToken(email, userId, maxAge);
  response.cookie("jwt", token, {
    maxAge,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
};

export const register = async (
  request: Request,
  response: Response
): Promise<Response | void> => {
  try {
    const validatedData = registerSchema.parse(request.body);

    const { email, password, firstName, lastName } = validatedData;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return errorResponse(response, "Error", "Email is already registered.");
    }

    const user = await User.create({ email, password, firstName, lastName });
    sendTokenCookie(response, email, user.id);

    return successResponse(response, "User registered successfully", user);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return errorResponse(
        response,
        "Validation errors",
        formatZodErrors(error)
      );
    }
    return errorResponse(response, "Error", "Internal server error.", 500);
  }
};

export const login = async (request: Request, response: Response) => {
  try {
    const validatedData = loginSchema.parse(request.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(
        response,
        "Error",
        "User not found with that email."
      );
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return errorResponse(response, "Error", "Password is incorrect.");
    }
    sendTokenCookie(response, email, user.id);
    return successResponse(response, "User login successfully", user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse(
        response,
        "Validation errors",
        formatZodErrors(error)
      );
    }
    return errorResponse(response, "Error", "Internal server error.", 500);
  }
};

export const getUserInfo = async (request: any, response: Response) => {
  try {
    const user = await User.findById(request.userId);
    if (!user) {
      return errorResponse(response, "Error", "User not found with that id.");
    }
    return successResponse(response, "Get user information successfully", user);
  } catch (error) {
    return errorResponse(response, "Error", "Internal server error.", 500);
  }
};

export const updateProfile = async (request: any, response: Response) => {
  try {
    const validatedData = updateProfileSchema.parse(request.body);

    const { firstName, lastName } = validatedData;

    console.log(firstName, lastName, "al");
    await User.findByIdAndUpdate(request.userId, {
      firstName,
      lastName,
    });
    return successResponse(response, "Update user information successfully");
  } catch (error) {
    return errorResponse(response, "Error", "Internal server error.", 500);
  }
};

export const addProfileImage = async (request: any, response: Response) => {
  try {
    console.log(request.file, "files");
    if (!request.file) {
      return errorResponse(
        response,
        "Validation Error",
        "File is required.",
        400
      );
    }

    const date = Date.now();
    let fileName = "uploads/profiles/" + date + request.file.originalname;

    const fileExtension = request.file.originalname
      .split(".")
      .pop()
      ?.toLowerCase();
    const validateFileTypes = ["png", "jpg", "jpeg", "webp", "video"];
    const fileType = validateFileTypes?.includes(fileExtension)
      ? (fileExtension as "png" | "jpg" | "jpeg" | "webp" | "video")
      : null;

    if (!fileType) {
      return errorResponse(
        response,
        "Validation Error",
        "File type is not allowed.",
        400
      );
    }
    renameSync(request.file.path, fileName);
    const updateImage = await File.create({
      model: "Users",
      model_id: request.userId,
      url: fileName,
      type: fileType,
    });

    return successResponse(
      response,
      "File uploaded successfully.",
      updateImage
    );
  } catch (error) {
    return errorResponse(response, "Error", "Internal server error", 500);
  }
};

export const removeProfileImage = async (request: any, response: Response) => {
  const { fileId } = request.params;
  try {
    const file = await File.findById(fileId);
    if (!file) return errorResponse(response, "Error", "File not found", 404);

    unlinkSync(file.url);
    await File.findByIdAndDelete(fileId);
    return successResponse(response, "File deleted successfully.");
  } catch (error) {
    return errorResponse(response, "Error", "Internal server error", 500);
  }
};

export const logout = async (request: any, response: Response) => {
  try {
    response.cookie("jwt", "", {
      maxAge: 1,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    return successResponse(response, "Successfully logout.");
  } catch (error) {
    return errorResponse(response, "Error", "Internal server error", 500);
  }
};
