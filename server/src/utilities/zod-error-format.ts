import { z } from "zod";

export const formatZodErrors = (errors: z.ZodError): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};
  errors.errors.forEach((error: any) => {
    const field = error.path[0] as string;
    formattedErrors[field] = error.message;
  });
  return formattedErrors;
};
