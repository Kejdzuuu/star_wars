import express from "express";
import * as vehiclesController from "../controllers/vehiclesController";

const vehiclesRouter = express.Router();

vehiclesRouter.get("/", vehiclesController.vehicles_get);

vehiclesRouter.get("/page/:page", vehiclesController.vehicles_page_get);

vehiclesRouter.get("/:id", vehiclesController.vehicle_get);

export default vehiclesRouter;
