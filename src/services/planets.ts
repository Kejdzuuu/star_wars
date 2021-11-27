import axios from "axios";
import { apiUrlPlanets } from "../constants";

export const getPage = async (page: string = "1") => {
  const response = await axios.get(`${apiUrlPlanets}/?page=${page}`);
  return response.data.results;
};

export const getAll = async () => {
  const result = await axios.get(`${apiUrlPlanets}`);
  const data = result.data;
  let planets = data.results;
  const planetsCount = data.count;
  const planetsPerPage = data.results.length;
  const numOfPages = Math.ceil(planetsCount / planetsPerPage);

  if (numOfPages > 1) {
    // fetch pages from 2 to last
    const pages = Array.from({ length: numOfPages - 1 }, (_x, i) =>
      (i + 2).toString()
    );
    const responses = await Promise.all(
      Array.from(pages, (page) => getPage(page))
    );
    planets = planets.concat(responses.flat());
  }
  return planets;
};
