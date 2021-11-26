import express from "express";
import * as planetsService from "../services/planets";

const planetsRouter = express.Router();

planetsRouter.get("/", async (req, res) => {
  const result = await planetsService.getAll();
  let planets = result.results;
  const planetCount = result.count;
  const planetsPerPage = result.results.length;
  const numOfPages = Math.ceil(planetCount / planetsPerPage);

  if (numOfPages > 1) {
    // fetch pages from 2 to last
    const pages = Array.from({ length: numOfPages - 1 }, (_x, i) =>
      (i + 2).toString()
    );
    const responses = await Promise.all(
      Array.from(pages, (page) => planetsService.getAll(page))
    );
    planets = planets.concat(
      responses.map((response) => response.results).flat()
    );
  }
  res.send(planets);
});

planetsRouter.get("/:page", async (req, res) => {
  const page = req.params.page;
  const planets = await planetsService.getAll(page);
  res.send(planets.results);
});

export default planetsRouter;
