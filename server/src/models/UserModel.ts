import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

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
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
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
