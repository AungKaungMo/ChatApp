import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { errorResponse } from "../utilities/response";

export const verifyToken = (
  request: any,
  response: Response,
  next: NextFunction
) => {
  const token =
    request.cookies.jwt || request.headers.authorization?.split(" ")[1];

  if (!token) {
    return errorResponse(response, "Error", "Unauthorized", 401);
  }
  jwt.verify(
    token,
    process.env.JWT_KEY || "",
    async (err: unknown, payload: any) => {
      if (err)
        return errorResponse(response, "Error", "Internal server error", 500);

      if (payload?.userId) {
        request.userId = payload.userId;
        return next();
      }
      return errorResponse(response, "Error", "Invalid token", 401);
    }
  );
};
