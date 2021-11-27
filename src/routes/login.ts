import express from "express";
import * as userController from "../controllers/userController";

const loginRouter = express.Router();

loginRouter.post("/", userController.user_login_post);

export default loginRouter;
