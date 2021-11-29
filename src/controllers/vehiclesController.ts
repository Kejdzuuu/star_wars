import express from "express";
import { apiUrlVehicles } from "../constants";
import { get_all_vehicles, get_vehicle, get_vehicles_page } from "./helpers";

export const vehicles_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const result = await get_all_vehicles();
  res.send(result);
};

export const vehicles_page_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const page = parseInt(req.params.page);
  if (isNaN(page) || page <= 0) {
    next();
  }
  const result = await get_vehicles_page(page);
  res.send(result);
};

export const vehicle_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;
  const url = `${apiUrlVehicles}/${id}/`;
  const result = await get_vehicle(url);
  res.send(result);
};
