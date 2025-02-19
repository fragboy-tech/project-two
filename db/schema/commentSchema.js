import mongoose from "mongoose";

const schema = mongoose.Schema;

export const commentSchema = new schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: false,
    },
    userId: { type: schema.ObjectId, ref: "Users" },
    blogId: { type: schema.ObjectId, ref: "Blogs" },
  },
  { timestamps: true, collection: "comments" }
);
