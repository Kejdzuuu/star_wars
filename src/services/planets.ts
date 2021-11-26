import axios from "axios";
import { apiUrlPlanets } from "../constants";

export const getAll = async (page: string = "1") => {
  const response = await axios.get(`${apiUrlPlanets}/?page=${page}`);
  return response.data;
};
