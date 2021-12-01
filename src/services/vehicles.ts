import axios from "axios";
import { apiUrlVehicles } from "../constants";

export const getPage = async (page: string = "1") => {
  try {
    const response = await axios.get(`${apiUrlVehicles}/?page=${page}`);
    return response.data.results;
  } catch (e) {
    return null;
  }
};

export const getAll = async () => {
  const result = await axios.get(`${apiUrlVehicles}`);
  const data = result.data;
  let vehicles = data.results;
  const vehiclesCount = data.count;
  const vehiclesPerPage = data.results.length;
  const numOfPages = Math.ceil(vehiclesCount / vehiclesPerPage);

  if (numOfPages > 1) {
    // fetch pages from 2 to last
    const pages = Array.from({ length: numOfPages - 1 }, (_x, i) =>
      (i + 2).toString()
    );
    const responses = await Promise.all(pages.map((page) => getPage(page)));
    vehicles = vehicles.concat(responses.flat());
  }
  return vehicles;
};

export const getOne = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrlVehicles}/${id}`);
    return response.data;
  } catch (e) {
    return null;
  }
};
