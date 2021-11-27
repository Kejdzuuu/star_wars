import express from "express";
import * as starshipsService from "../services/starships";

const starshipsRouter = express.Router();

starshipsRouter.get("/", async (req, res) => {
  const result = await starshipsService.getAll();
  res.send(result);
});

starshipsRouter.get("/page/:page", async (req, res) => {
  const page = req.params.page;
  const result = await starshipsService.getPage(page);
  res.send(result);
});

export default starshipsRouter;
