import axios from "axios";
import { apiUrlFilms } from "../constants";

export const getPage = async (page: string = "1") => {
  try {
    const response = await axios.get(`${apiUrlFilms}/?page=${page}`);
    return response.data.results;
  } catch (e) {
    return null;
  }
};

export const getAll = async () => {
  const result = await axios.get(`${apiUrlFilms}`);
  const data = result.data;
  let films = data.results;
  const filmCount = data.count;
  const filmsPerPage = data.results.length;
  const numOfPages = Math.ceil(filmCount / filmsPerPage);

  if (numOfPages > 1) {
    // fetch pages from 2 to last
    const pages = Array.from({ length: numOfPages - 1 }, (_x, i) =>
      (i + 2).toString()
    );
    const responses = await Promise.all(pages.map((page) => getPage(page)));
    films = films.concat(
      responses.filter((response) => response !== null).flat()
    );
  }
  return films;
};

export const getOne = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrlFilms}/${id}`);
    return response.data;
  } catch (e) {
    return null;
  }
};
