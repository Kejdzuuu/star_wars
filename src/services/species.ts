import axios from "axios";
import { apiUrlSpecies } from "../constants";

export const getAll = async (page: string = "1") => {
  const response = await axios.get(`${apiUrlSpecies}/?page=${page}`);
  return response.data;
};
