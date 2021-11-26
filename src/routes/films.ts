import express from "express";
import * as filmsService from "../services/films";

const filmsRouter = express.Router();

filmsRouter.get("/", async (req, res) => {
  const result = await filmsService.getAll();
  let films = result.results;
  const filmCount = result.count;
  const filmsPerPage = result.results.length;
  const numOfPages = Math.ceil(filmCount / filmsPerPage);

  if (numOfPages > 1) {
    // fetch pages from 2 to last
    const pages = Array.from({ length: numOfPages - 1 }, (_x, i) =>
      (i + 2).toString()
    );
    const responses = await Promise.all(
      Array.from(pages, (page) => filmsService.getAll(page))
    );
    films = films.concat(responses.map((response) => response.results).flat());
  }
  res.send(films);
});

filmsRouter.get("/:page", async (req, res) => {
  const page = req.params.page;
  const films = await filmsService.getAll(page);
  res.send(films.results);
});

export default filmsRouter;
