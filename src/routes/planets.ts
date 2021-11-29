import express from "express";
import * as planetsController from "../controllers/planetsController";

const planetsRouter = express.Router();

planetsRouter.get("/", planetsController.planets_get);

planetsRouter.get("/page/:page", planetsController.planets_page_get);

planetsRouter.get("/:id", planetsController.planet_get);

export default planetsRouter;
