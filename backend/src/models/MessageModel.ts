import mongoose from "mongoose";

interface IMessage {
  sender_id: mongoose.Types.ObjectId;
  receiver_id: mongoose.Types.ObjectId;
  messageType: string;
  content?: string;
}

const MessageSchema = new mongoose.Schema<IMessage>(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    messageType: {
      type: String,
      enum: ["text", "file"],
      required: true,
    },
    content: {
      type: String,
      required: function () {
        return this.messageType === "text";
      },
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.createdAt;
    delete returnedObject.updatedAt;
    return returnedObject;
  },
});

const Message = mongoose.model<IMessage>("Messages", MessageSchema);
export default Message;
