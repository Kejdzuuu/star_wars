import axios from "axios";
import { apiUrlVehicles } from "../constants";

export const getAll = async (page: string = "1") => {
  const response = await axios.get(`${apiUrlVehicles}/?page=${page}`);
  return response.data;
};
