import express from "express";
import * as userController from "../../controllers/userController";

const speciesRouter = express.Router();

speciesRouter.get("/", userController.user_all_species_get);

speciesRouter.get("/:id", userController.user_one_species_get);

export default speciesRouter;
