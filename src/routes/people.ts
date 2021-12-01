import express from "express";
import * as peopleService from "../services/people";

const peopleRouter = express.Router();

peopleRouter.get("/", async (req, res) => {
  const result = await peopleService.getAll();
  res.send(result);
});

peopleRouter.get("/page/:page", async (req, res) => {
  const page = req.params.page;
  const result = await peopleService.getPage(page);
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
});

peopleRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await peopleService.getOne(id);
  if (result === null) {
    return res.status(404).json({ error: "resource doesn't exist" });
  }
  res.send(result);
});

export default peopleRouter;
