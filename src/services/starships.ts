import axios from "axios";
import { apiUrlStarships } from "../constants";

export const getAll = async (page: string = "1") => {
  const response = await axios.get(`${apiUrlStarships}/?page=${page}`);
  return response.data;
};
