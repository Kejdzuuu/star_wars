import express from "express";
import * as filmsController from "../controllers/filmsController";

const filmsRouter = express.Router({ mergeParams: true });

filmsRouter.get("/", filmsController.films_get);

filmsRouter.get("/page/:page", filmsController.films_page_get);

filmsRouter.get("/:id", filmsController.film_get);

export default filmsRouter;
