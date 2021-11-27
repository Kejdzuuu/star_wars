import express from "express";
import User from "../models/user";
import * as peopleService from "../services/people";

const bcrypt = require("bcrypt");

export const user_create_post = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const body = req.body;
  const salt = 10;
  const passwordHash = await bcrypt.hash(body.password, salt);

  const random_character = await peopleService.getRandom();

  const user = new User({
    email: body.email,
    passwordHash: passwordHash,
    character_name: random_character.name,
    character_id: random_character.id,
  });

  const savedUser = await user.save();
  res.json(savedUser);
};
