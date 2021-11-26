import express from "express";
import * as vehiclesService from "../services/vehicles";

const vehiclesRouter = express.Router();

vehiclesRouter.get("/", async (req, res) => {
  const result = await vehiclesService.getAll();
  let vehicles = result.results;
  const vehicleCount = result.count;
  const vehiclesPerPage = result.results.length;
  const numOfPages = Math.ceil(vehicleCount / vehiclesPerPage);

  if (numOfPages > 1) {
    // fetch pages from 2 to last
    const pages = Array.from({ length: numOfPages - 1 }, (_x, i) =>
      (i + 2).toString()
    );
    const responses = await Promise.all(
      Array.from(pages, (page) => vehiclesService.getAll(page))
    );
    vehicles = vehicles.concat(
      responses.map((response) => response.results).flat()
    );
  }
  res.send(vehicles);
});

vehiclesRouter.get("/:page", async (req, res) => {
  const page = req.params.page;
  const vehicles = await vehiclesService.getAll(page);
  res.send(vehicles.results);
});

export default vehiclesRouter;
