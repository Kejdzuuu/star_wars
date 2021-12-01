import axios from "axios";
import { apiUrlPeople } from "../constants";

export const getPage = async (page: string = "1") => {
  try {
    const response = await axios.get(`${apiUrlPeople}/?page=${page}`);
    return response.data.results;
  } catch (e) {
    return null;
  }
};

export const getAll = async () => {
  const result = await axios.get(`${apiUrlPeople}`);
  const data = result.data;
  let people = data.results;
  const peopleCount = data.count;
  const peoplePerPage = data.results.length;
  const numOfPages = Math.ceil(peopleCount / peoplePerPage);

  if (numOfPages > 1) {
    // fetch pages from 2 to last
    const pages = Array.from({ length: numOfPages - 1 }, (_x, i) =>
      (i + 2).toString()
    );
    const responses = await Promise.all(pages.map((page) => getPage(page)));
    people = people.concat(
      responses.filter((response) => response !== null).flat()
    );
  }
  return people;
};

export const getOne = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrlPeople}/${id}`);
    return response.data;
  } catch (e) {
    return null;
  }
};

export const getRandom = async () => {
  const people = await getAll();
  const random_index = Math.floor(Math.random() * people.length);
  const character = people[random_index];
  const character_id = character.url.slice(apiUrlPeople.length + 1, -1); // get just id
  const result = {
    id: character_id,
    name: character.name,
  };
  return result;
};
