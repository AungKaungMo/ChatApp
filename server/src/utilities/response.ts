import { Response } from "express";

interface ErrorDetail {
  field: string;
  issue: string;
}

export interface ErrorResponse {
  status: boolean;
  message: string;
  error?: string;
  details?: ErrorDetail[];
}

export const successResponse = (
  res: Response,
  message: string,
  data?: any,
  code?: number
) => {
  const responseObj = {
    status: true,
    message,
    ...(data && { data }),
  };

  return res.status(code || 200).json(responseObj);
};

export const errorResponse = (
  res: Response,
  message: string,
  error: unknown,
  code?: number
) => {
  const responseObj = {
    status: false,
    message,
    error,
  };
  return res.status(code || 400).json(responseObj);
};

export default {
  successResponse,
  errorResponse,
};
