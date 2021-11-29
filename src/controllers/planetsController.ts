import express from "express";
import { apiUrlPlanets } from "../constants";
import { get_all_planets, get_planet, get_planets_page } from "./helpers";

export const planets_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const result = await get_all_planets();
  res.send(result);
};

export const planets_page_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const page = parseInt(req.params.page);
  if (isNaN(page) || page <= 0) {
    next();
  }
  const result = await get_planets_page(page);
  res.send(result);
};

export const planet_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;
  const url = `${apiUrlPlanets}/${id}/`;
  const result = await get_planet(url);
  res.send(result);
};
