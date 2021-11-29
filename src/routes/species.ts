import express from "express";
import * as speciesController from "../controllers/speciesController";

const speciesRouter = express.Router();

speciesRouter.get("/", speciesController.species_get_all);

speciesRouter.get("/page/:page", speciesController.species_page_get);

speciesRouter.get("/:id", speciesController.species_get_one);

export default speciesRouter;
