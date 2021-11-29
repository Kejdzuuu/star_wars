import express from "express";
import * as starshipsController from "../controllers/starshipsController";

const starshipsRouter = express.Router();

starshipsRouter.get("/", starshipsController.starships_get);

starshipsRouter.get("/page/:page", starshipsController.starships_page_get);

starshipsRouter.get("/:id", starshipsController.starship_get);

export default starshipsRouter;
