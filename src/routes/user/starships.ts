import express from "express";
import * as userController from "../../controllers/userController";

const starshipsRouter = express.Router();

starshipsRouter.get("/", userController.user_starships_get);

export default starshipsRouter;
