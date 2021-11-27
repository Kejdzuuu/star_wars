import express from "express";
import * as filmsService from "../services/films";

const filmsRouter = express.Router();

filmsRouter.get("/", async (req, res) => {
  const result = await filmsService.getAll();
  res.send(result);
});

filmsRouter.get("/page/:page", async (req, res) => {
  const page = req.params.page;
  const result = await filmsService.getPage(page);
  res.send(result);
});

export default filmsRouter;
