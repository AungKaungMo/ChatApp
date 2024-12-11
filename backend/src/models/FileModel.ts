import mongoose from "mongoose";

interface IFile {
  model: string;
  model_id: mongoose.Types.ObjectId;
  url: string;
  type: "png" | "jpg" | "jpeg" | "webp" | "video";
  createdAt?: Date;
  updatedAt?: Date;
}

const FileSchema = new mongoose.Schema<IFile>(
  {
    model: {
      type: String,
      required: true,
    },
    model_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["png", "jpg", "jpeg", "webp", "video"],
    },
  },
  {
    timestamps: true,
  }
);

FileSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
    return returnedObject;
  },
});

const File = mongoose.model<IFile>("Files", FileSchema);
export default File;
