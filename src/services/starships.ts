import axios from "axios";
import { apiUrlStarships } from "../constants";

export const getPage = async (page: string = "1") => {
  try {
    const response = await axios.get(`${apiUrlStarships}/?page=${page}`);
    return response.data.results;
  } catch (e) {
    return null;
  }
};

export const getAll = async () => {
  const result = await axios.get(`${apiUrlStarships}`);
  const data = result.data;
  let starships = data.results;
  const starshipsCount = data.count;
  const starshipsPerPage = data.results.length;
  const numOfPages = Math.ceil(starshipsCount / starshipsPerPage);

  if (numOfPages > 1) {
    // fetch pages from 2 to last
    const pages = Array.from({ length: numOfPages - 1 }, (_x, i) =>
      (i + 2).toString()
    );
    const responses = await Promise.all(pages.map((page) => getPage(page)));
    starships = starships.concat(responses.flat());
  }
  return starships;
};

export const getOne = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrlStarships}/${id}`);
    return response.data;
  } catch (e) {
    return null;
  }
};
