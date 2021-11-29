import express from "express";
import User from "../models/user";
import * as peopleService from "../services/people";
import {
  getToken,
  get_film,
  get_planet,
  get_species,
  get_starship,
  get_vehicle,
} from "./helpers";

import bcrypt from "bcrypt";
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

export const user_planet_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = getToken(req);
  const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null;

  if (!token || !decodedToken?.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "user doesn't exist" });
  }

  const userCharacter = await peopleService.getOne(user.character_id);
  if (!userCharacter) {
    return res.status(401).json({ error: "character doesn't exist" });
  }

  const result = get_planet(userCharacter.homeworld);
  res.send(result);
};

export const user_films_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = getToken(req);
  const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null;

  if (!token || !decodedToken?.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "user doesn't exist" });
  }

  const userCharacter = await peopleService.getOne(user.character_id);
  if (!userCharacter) {
    return res.status(401).json({ error: "character doesn't exist" });
  }

  const result = await Promise.all(
    userCharacter.films.map((url: string) => get_film(url))
  );
  res.send(result);
};

export const user_species_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = getToken(req);
  const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null;

  if (!token || !decodedToken?.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "user doesn't exist" });
  }

  const userCharacter = await peopleService.getOne(user.character_id);
  if (!userCharacter) {
    return res.status(401).json({ error: "character doesn't exist" });
  }

  const result = await Promise.all(
    userCharacter.species.map((url: string) => get_species(url))
  );
  res.send(result);
};

export const user_vehicles_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = getToken(req);
  const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null;

  if (!token || !decodedToken?.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: "user doesn't exist" });
  }

  const userCharacter = await peopleService.getOne(user.character_id);
  if (!userCharacter) {
    return res.status(401).json({ error: "character doesn't exist" });
  }

  const result = await Promise.all(
    userCharacter.vehicles.map((url: string) => get_vehicle(url))
  );
  res.send(result);
};

export const user_starships_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = getToken(req);
  const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null;

  if (!token || !decodedToken?.id) {
    return res.status(401).json({ error: "invalid token" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(404).json({ error: "user doesn't exist" });
  }

  const userCharacter = await peopleService.getOne(user.character_id);
  if (!userCharacter) {
    return res.status(404).json({ error: "character doesn't exist" });
  }

  const result = await Promise.all(
    userCharacter.starships.map((url: string) => get_starship(url))
  );
  res.send(result);
};
