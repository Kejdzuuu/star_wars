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
import {
  apiUrlFilms,
  apiUrlPlanets,
  apiUrlSpecies,
  apiUrlStarships,
  apiUrlVehicles,
} from "../constants";
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

export const user_auth = async (
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

  res.locals.user = user;
  res.locals.userCharacter = userCharacter;
  next();
};

export const user_homeworld_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userCharacter = res.locals.userCharacter;
  console.log(userCharacter.homeworld);
  const result = get_planet(userCharacter.homeworld);
  res.send(result);
};

export const user_planet_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;
  const url = `${apiUrlPlanets}/${id}/`;
  const userCharacter = res.locals.userCharacter;

  if (userCharacter.homeworld === url) {
    const result = await get_planet(url);
    if (result === null) {
      return res.status(404).json({ error: "resource doesn't exist" });
    }
    res.send(result);
  } else {
    return res.status(403).json({ error: "no access" });
  }
};

export const user_film_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;
  const url = `${apiUrlFilms}/${id}/`;
  const userCharacter = res.locals.userCharacter;

  if (userCharacter.films.includes(url)) {
    const result = await get_film(url);
    if (result === null) {
      return res.status(404).json({ error: "resource doesn't exist" });
    }
    res.send(result);
  } else {
    return res.status(403).json({ error: "no access" });
  }
};

export const user_films_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userCharacter = res.locals.userCharacter;

  const result = await Promise.all(
    userCharacter.films.map((url: string) => get_film(url))
  );
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
};

export const user_one_species_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;
  const url = `${apiUrlSpecies}/${id}/`;
  const userCharacter = res.locals.userCharacter;

  if (userCharacter.species.includes(url)) {
    const result = await get_species(url);
    if (result === null) {
      return res.status(404).json({ error: "resource doesn't exist" });
    }
    res.send(result);
  } else {
    return res.status(403).json({ error: "no access" });
  }
};

export const user_all_species_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userCharacter = res.locals.userCharacter;

  const result = await Promise.all(
    userCharacter.species.map((url: string) => get_species(url))
  );
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
};

export const user_vehicle_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;
  const url = `${apiUrlVehicles}/${id}/`;
  const userCharacter = res.locals.userCharacter;

  if (userCharacter.vehicles.includes(url)) {
    const result = await get_vehicle(url);
    if (result === null) {
      return res.status(404).json({ error: "resource doesn't exist" });
    }
    res.send(result);
  } else {
    return res.status(403).json({ error: "no access" });
  }
};

export const user_vehicles_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userCharacter = res.locals.userCharacter;

  const result = await Promise.all(
    userCharacter.vehicles.map((url: string) => get_vehicle(url))
  );
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
};

export const user_starship_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;
  const url = `${apiUrlStarships}/${id}/`;
  const userCharacter = res.locals.userCharacter;

  if (userCharacter.starships.includes(url)) {
    const result = await get_starship(url);
    if (result === null) {
      return res.status(404).json({ error: "resource doesn't exist" });
    }
    res.send(result);
  } else {
    return res.status(403).json({ error: "no access" });
  }
};

export const user_starships_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userCharacter = res.locals.userCharacter;

  const result = await Promise.all(
    userCharacter.starships.map((url: string) => get_starship(url))
  );
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
};
