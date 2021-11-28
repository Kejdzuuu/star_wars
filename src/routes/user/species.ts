import express from "express";
import * as userController from "../../controllers/userController";

const speciesRouter = express.Router();

speciesRouter.get("/", userController.user_species_get);

export default speciesRouter;
