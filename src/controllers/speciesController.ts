import express from "express";
import { apiUrlSpecies } from "../constants";
import { get_all_species, get_species, get_species_page } from "./helpers";

export const species_get_all = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const result = await get_all_species();
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
};

export const species_page_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const page = parseInt(req.params.page);
  if (isNaN(page) || page <= 0) {
    next();
  }
  const result = await get_species_page(page);
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
};

export const species_get_one = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;
  const url = `${apiUrlSpecies}/${id}/`;
  const result = await get_species(url);
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
};
