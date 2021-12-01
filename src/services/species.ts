import axios from "axios";
import { apiUrlSpecies } from "../constants";

export const getPage = async (page: string = "1") => {
  try {
    const response = await axios.get(`${apiUrlSpecies}/?page=${page}`);
    return response.data.results;
  } catch (e) {
    return null;
  }
};

export const getAll = async () => {
  const result = await axios.get(`${apiUrlSpecies}`);
  const data = result.data;
  let species = data.results;
  const speciesCount = data.count;
  const speciesPerPage = data.results.length;
  const numOfPages = Math.ceil(speciesCount / speciesPerPage);

  if (numOfPages > 1) {
    // fetch pages from 2 to last
    const pages = Array.from({ length: numOfPages - 1 }, (_x, i) =>
      (i + 2).toString()
    );
    const responses = await Promise.all(pages.map((page) => getPage(page)));
    species = species.concat(responses.flat());
  }
  return species;
};

export const getOne = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrlSpecies}/${id}`);
    return response.data;
  } catch (e) {
    return null;
  }
};
