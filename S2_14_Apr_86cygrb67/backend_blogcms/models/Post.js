import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    tags: [String],
    imageUrl: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
