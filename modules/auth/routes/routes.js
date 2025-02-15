import express from "express";

import { Users } from "../../../db/models/User.js";

export const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
  try {
    const { password, email, username } = req.body;

    const user = await Users.register({ email, password, username });
    const token = user.getToken();

    res.send(token);
  } catch (e) {
    res.send(e.message);
  }
});

authRoutes.post("/login", async (req, res) => {
  const { password, email } = req.body;

  try {
    const token = await Users.login({ email, password });

    res.send(token);
  } catch (e) {
    res.send(e.message);
  }
});
