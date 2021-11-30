import express from "express";
import * as userController from "../../controllers/userController";

const filmsRouter = express.Router();

filmsRouter.get("/", userController.user_films_get);

filmsRouter.get("/:id", userController.user_film_get);

export default filmsRouter;
