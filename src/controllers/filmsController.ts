import express from "express";
import { apiUrlFilms } from "../constants";
import { get_all_films, get_film, get_films_page } from "./helpers";

export const films_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const result = await get_all_films();
  res.send(result);
};

export const films_page_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const page = parseInt(req.params.page);
  if (isNaN(page) || page <= 0) {
    next();
  }
  const result = await get_films_page(page);
  res.send(result);
};

export const film_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;
  const url = `${apiUrlFilms}/${id}/`;
  const result = await get_film(url);
  res.send(result);
};
