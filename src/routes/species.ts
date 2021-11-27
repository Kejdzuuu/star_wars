import express from "express";
import * as speciesService from "../services/species";

const speciesRouter = express.Router();

speciesRouter.get("/", async (req, res) => {
  const result = await speciesService.getAll();
  res.send(result);
});

speciesRouter.get("/page/:page", async (req, res) => {
  const page = req.params.page;
  const result = await speciesService.getPage(page);
  res.send(result);
});

export default speciesRouter;
