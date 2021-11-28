import express from "express";
import * as vehiclesService from "../services/vehicles";

const vehiclesRouter = express.Router();

vehiclesRouter.get("/", async (req, res) => {
  const result = await vehiclesService.getAll();
  res.send(result);
});

vehiclesRouter.get("/page/:page", async (req, res) => {
  const page = req.params.page;
  const result = await vehiclesService.getPage(page);
  res.send(result);
});

vehiclesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await vehiclesService.getOne(id);
  res.send(result);
});

export default vehiclesRouter;
