import mongoose from "mongoose";
import { genSalt, hash } from "bcryptjs";

interface IUser {
  email: string;
  password: string;
  name: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    delete returnedObject.password;
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
    return returnedObject;
  },
});

const User = mongoose.model<IUser>("Users", UserSchema);
export default User;
