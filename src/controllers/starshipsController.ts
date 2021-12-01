import express from "express";
import { apiUrlStarships } from "../constants";
import { get_all_starships, get_starship, get_starships_page } from "./helpers";

export const starships_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const result = await get_all_starships();
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
};

export const starships_page_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const page = parseInt(req.params.page);
  if (isNaN(page) || page <= 0) {
    next();
  }
  const result = await get_starships_page(page);
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
};

export const starship_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;
  const url = `${apiUrlStarships}/${id}/`;
  const result = await get_starship(url);
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
};
