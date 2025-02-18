import express from "express";
import { Users } from "../../../db/models/User.js";

import { Blogs } from "../../../db/models/Blog.js";

export const blogRoutes = express.Router();

blogRoutes.post("/create", async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const { userId } = req.user;

    const blog = await Blogs.create({ title, description, content, userId });

    res.send(blog);
  } catch (e) {
    res.send(e.message);
  }
});

blogRoutes.put("/update", async (req, res) => {
  const { title } = req.query;
  const { blogId: myid } = req.user;

  try {
    const blog = await Blogs.findOneAndUpdate(
      { _id: { $eq: myid } },
      { $set: { title: title } },
      { new: true }
    );
    res.send(blog);
  } catch (e) {
    res.send("ooriin haygaar newterne vv");
  }
});
