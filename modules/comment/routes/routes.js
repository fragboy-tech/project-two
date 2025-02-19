import express from "express";
import { Comments } from "../../../db/models/Comment.js";

export const commentRoutes = express.Router();

commentRoutes.post("/:blogId", async (req, res) => {
  try {
    const { content } = req.body;
    const { userId } = req.user;
    const { blogId } = req.params;

    const addComm = await Comments.create({
      content,
      userId,
      blogId,
    });

    res.send(addComm);
  } catch (e) {
    res.send(e.message);
  }
});

commentRoutes.get("/:blogId", async (req, res) => {
  const { blogId } = req.params;

  try {
    const comOnBlog = await Comments.find({ blogId: { $eq: blogId } });

    res.send(comOnBlog);
  } catch (e) {
    res.send("blog oldsnguie");
  }
});

commentRoutes.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.user;

  try {
    const deleted = await Comments.deleteOne({
      userId: { $eq: userId },
      _id: commentId,
    });
    if (deleted.deletedCount > 0) {
      res.status(200).send({ message: "Comment deleted successfully." });
    } else {
      res
        .status(404)
        .send({ message: "Comment not found or not authorized to delete." });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});
