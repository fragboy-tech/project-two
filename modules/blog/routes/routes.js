import express from "express";

import { Blogs } from "../../../db/models/Blog.js";

export const blogRoutes = express.Router();

blogRoutes.post("/", async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const { userId } = req.user;

    const blog = await Blogs.create({ title, description, content, userId });

    res.send(blog);
  } catch (e) {
    res.send(e.message);
  }
});

blogRoutes.put("/:blogId", async (req, res) => {
  const { title, description, content } = req.body;
  const { userId } = req.user;

  const { blogId } = req.params;

  try {
    const blog = await Blogs.updateOne(
      { _id: { $eq: blogId }, userId },
      { $set: { title, description, content } }
    );

    if (!blog) {
      return res.status(404).send("Blog not found.");
    }

    res.send(blog);
  } catch (e) {
    res.send("ooriin haygaar newterne vv");
  }
});

blogRoutes.get("/me", async (req, res) => {
  const { userId } = req.user;

  try {
    const myBlog = await Blogs.find({ userId: { $eq: userId } });

    res.send(myBlog);
  } catch (e) {
    res.send("id taarsangui");
  }
});

blogRoutes.get("/detail/:blogId", async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;

  try {
    const myBlog = await Blogs.findOne({ _id: { $eq: blogId }, userId });

    res.send(myBlog);
  } catch (e) {
    res.send("id taarsangui");
  }
});

blogRoutes.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const otherBlogs = await Blogs.find({ userId: { $eq: userId } });

    res.send(otherBlogs);
  } catch (e) {
    res.send("id taarsangui");
  }
});

blogRoutes.delete("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  const { userId } = req.user;

  try {
    const deleted = await Blogs.deleteOne({
      userId: { $eq: userId },
      _id: blogId,
    });
    if (deleted.deletedCount > 0) {
      res.status(200).send({ message: "Blog deleted successfully." });
    } else {
      res
        .status(404)
        .send({ message: "Blog not found or not authorized to delete." });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});
