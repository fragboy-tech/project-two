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
      { _id: { $eq: blogId } },
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
