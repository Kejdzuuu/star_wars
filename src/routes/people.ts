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
  res.send(result);
});

export default peopleRouter;
