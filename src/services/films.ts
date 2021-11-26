import axios from "axios";
import { apiUrlFilms } from "../constants";

export const getAll = async (page: string = "1") => {
  const response = await axios.get(`${apiUrlFilms}/?page=${page}`);
  return response.data;
};
