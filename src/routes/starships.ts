import express from "express";
import * as starshipsService from "../services/starships";

const starshipsRouter = express.Router();

starshipsRouter.get("/", async (req, res) => {
  const result = await starshipsService.getAll();
  let starships = result.results;
  const starshipCount = result.count;
  const starshipsPerPage = result.results.length;
  const numOfPages = Math.ceil(starshipCount / starshipsPerPage);

  if (numOfPages > 1) {
    // fetch pages from 2 to last
    const pages = Array.from({ length: numOfPages - 1 }, (_x, i) =>
      (i + 2).toString()
    );
    const responses = await Promise.all(
      Array.from(pages, (page) => starshipsService.getAll(page))
    );
    starships = starships.concat(
      responses.map((response) => response.results).flat()
    );
  }
  res.send(starships);
});

starshipsRouter.get("/:page", async (req, res) => {
  const page = req.params.page;
  const starships = await starshipsService.getAll(page);
  res.send(starships.results);
});

export default starshipsRouter;
