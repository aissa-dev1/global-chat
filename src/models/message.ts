import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
});

export const Message = mongoose.model("messages", messageSchema);
