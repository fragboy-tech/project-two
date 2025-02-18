import express from "express";

import { Users } from "../../../db/models/User.js";

export const userRoutes = express.Router();

userRoutes.get("/get-token", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });

    res.send(user.getToken());
  } catch (e) {
    res.send(e.message);
  }
});

userRoutes.get("/profile", async (req, res) => {
  const { userid } = req.query;

  const { userId: myid } = req.user;

  try {
    const user = await Users.findOne({ _id: { $eq: userid ? userid : myid } });

    res.send(user);
  } catch (e) {
    res.send("id taarsangui");
  }
});

userRoutes.put("/update", async (req, res) => {
  const { userName } = req.body;
  const { userId: myid } = req.user;

  try {
    const user = await Users.findOneAndUpdate(
      { _id: { $eq: myid } },
      { $set: { username: userName } },
      { new: true }
    );
    res.send(user);
  } catch (e) {
    res.send("ooriin haygaar newterne vv");
  }
});
