import express from "express";
import * as planetsService from "../services/planets";

const planetsRouter = express.Router();

planetsRouter.get("/", async (req, res) => {
  const result = await planetsService.getAll();
  res.send(result);
});

planetsRouter.get("/page/:page", async (req, res) => {
  const page = req.params.page;
  const result = await planetsService.getPage(page);
  res.send(result);
});

export default planetsRouter;
