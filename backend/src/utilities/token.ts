import { sign } from "jsonwebtoken";

export const createToken = (email: string, userId: string, maxAge: number) => {
  return sign({ email, userId }, process.env.JWT_KEY || "", {
    expiresIn: maxAge,
  });
};
