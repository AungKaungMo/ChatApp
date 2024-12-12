import { z } from "zod";

// Schema for user registration
export const registerSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  name: z.string().min(1, "Name is required."),
});

// Schema for user login
export const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

// Schema for user update profile
export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required."),
});
