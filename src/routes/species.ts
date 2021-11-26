import express from "express";
import * as speciesService from "../services/species";

const speciesRouter = express.Router();

speciesRouter.get("/", async (req, res) => {
  const result = await speciesService.getAll();
  let species = result.results;
  const specieCount = result.count;
  const speciesPerPage = result.results.length;
  const numOfPages = Math.ceil(specieCount / speciesPerPage);

  if (numOfPages > 1) {
    // fetch pages from 2 to last
    const pages = Array.from({ length: numOfPages - 1 }, (_x, i) =>
      (i + 2).toString()
    );
    const responses = await Promise.all(
      Array.from(pages, (page) => speciesService.getAll(page))
    );
    species = species.concat(
      responses.map((response) => response.results).flat()
    );
  }
  res.send(species);
});

speciesRouter.get("/:page", async (req, res) => {
  const page = req.params.page;
  const species = await speciesService.getAll(page);
  res.send(species.results);
});

export default speciesRouter;
