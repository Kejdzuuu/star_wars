import express from "express";
import * as userController from "../../controllers/userController";

const planetRouter = express.Router();

planetRouter.get("/", userController.user_planet_get);

export default planetRouter;
