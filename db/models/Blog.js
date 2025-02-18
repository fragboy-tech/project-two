import mongoose from "mongoose";
import { blogSchema } from "../schema/blogSchema.js";
export const Blogs = mongoose.model("Blogs", blogSchema);
