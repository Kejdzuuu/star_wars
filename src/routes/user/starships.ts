import express from "express";
import * as userController from "../../controllers/userController";

const starshipsRouter = express.Router();

starshipsRouter.get("/", userController.user_starships_get);

starshipsRouter.get("/:id", userController.user_starship_get);

export default starshipsRouter;
