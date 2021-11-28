import express from "express";
import * as userController from "../../controllers/userController";

const vehiclesRouter = express.Router();

vehiclesRouter.get("/", userController.user_vehicles_get);

export default vehiclesRouter;
