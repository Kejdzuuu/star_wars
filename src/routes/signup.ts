import express from "express";
import * as userController from "../controllers/userController";

const signupRouter = express.Router();

signupRouter.post("/", userController.user_create_post);

export default signupRouter;
