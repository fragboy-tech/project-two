import mongoose from "mongoose";
import { commentSchema } from "../schema/commentSchema.js";
export const Comments = mongoose.model("Comments", commentSchema);
