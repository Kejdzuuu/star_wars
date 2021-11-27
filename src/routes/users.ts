import express from "express";
import * as userController from "../controllers/userController";

const usersRouter = express.Router();

usersRouter.post("/", userController.user_create_post);

export default usersRouter;
