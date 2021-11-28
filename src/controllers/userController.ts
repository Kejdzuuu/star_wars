import express from "express";
import User from "../models/user";
import * as peopleService from "../services/people";
import * as filmsService from "../services/films";
import * as speciesService from "../services/species";
import * as starshipsService from "../services/starships";
import * as vehiclesService from "../services/vehicles";
import * as planetsService from "../services/planets";
import {
  apiUrlFilms,
  apiUrlPlanets,
  apiUrlSpecies,
  apiUrlStarships,
  apiUrlVehicles,
} from "../constants";

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

  const planetId = getIdFromUrl(userCharacter.homeworld, apiUrlPlanets);
  const result = await planetsService.getOne(planetId);
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

  const filmIds = userCharacter.films.map((url: string) =>
    getIdFromUrl(url, apiUrlFilms)
  );
  const result = await filmsService.getMany(filmIds);
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

  const speciesIds = userCharacter.species.map((url: string) =>
    getIdFromUrl(url, apiUrlSpecies)
  );
  const result = await speciesService.getMany(speciesIds);
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

  const vehicleIds = userCharacter.vehicles.map((url: string) =>
    getIdFromUrl(url, apiUrlVehicles)
  );
  const result = await vehiclesService.getMany(vehicleIds);
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

  const starshipIds = userCharacter.starships.map((url: string) =>
    getIdFromUrl(url, apiUrlStarships)
  );

  const result = await starshipsService.getMany(starshipIds);
  res.send(result);
};

const getToken = (req: express.Request) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
};

const getIdFromUrl = (url: string, baseUrl: string) => {
  return url.slice(baseUrl.length + 1, -1);
};
