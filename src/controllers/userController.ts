import express from "express";
import User from "../models/user";
import * as peopleService from "../services/people";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

export const user_login_post = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  let loginSuccessful = false;

  if (user) {
    loginSuccessful = await bcrypt.compare(body.password, user.passwordHash);
  }

  if (!loginSuccessful) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const token = jwt.sign(
    { email: user!.email, id: user!._id },
    process.env.SECRET
  );
  res.status(200).send({
    token,
    email: user!.email,
    character_name: user!.character_name,
    character_id: user!.character_id,
  });
};
