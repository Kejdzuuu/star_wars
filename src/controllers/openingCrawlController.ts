import express from "express";
import { get_all_films } from "./helpers";
import * as peopleService from "../services/people";

interface WordCount {
  [word: string]: number;
}

export const unique_words_get = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const films = await get_all_films();
  let pairs: WordCount = {};

  for (let film of films) {
    const punctuation_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const opening_words = film.opening_crawl
      .split("\r")
      .join(" ")
      .split("\n")
      .join(" ")
      .toLowerCase()
      .replace(punctuation_regex, "")
      .split(" ")
      .filter((word: string) => word !== "");
    for (let word of opening_words) {
      if (pairs[word] == undefined) {
        pairs[word] = 1;
      } else {
        pairs[word] += 1;
      }
    }
  }
  const sorted = Object.entries(pairs).sort((a, b) => b[1] - a[1]);
  res.send(sorted);
};

export const most_popular_character = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const films = await get_all_films();
  const characters = await peopleService.getAll();

  const openings = films.map(
    (film: { opening_crawl: string }) => film.opening_crawl
  );
  const names = characters.map((character: { name: string }) => character.name);
  let name_appears: WordCount = {};

  for (let name of names) {
    let count = 0;
    for (let opening of openings) {
      const n = opening.split(name).length - 1;
      count += n;
    }
    if (name_appears[name] == undefined) {
      name_appears[name] = count;
    } else {
      name_appears[name] += count;
    }
  }

  const sorted = Object.entries(name_appears).sort((a, b) => b[1] - a[1]);
  const most_appearences = sorted[0][1];
  res.send(sorted.filter((name_count) => name_count[1] === most_appearences));
};

export const trie_nodes_count = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const films = await get_all_films();
  let words: string[] = [];

  for (let film of films) {
    const punctuation_regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const opening_words = film.opening_crawl
      .split("\r")
      .join(" ")
      .split("\n")
      .join(" ")
      .toLowerCase()
      .replace(punctuation_regex, "")
      .split(" ")
      .filter((word: string) => word !== "");
    for (let word of opening_words) {
      if (!words.includes(word)) words.push(word);
    }
  }

  let nodes_count = 1;
  let nodes: string[] = [];

  for (let word of words) {
    for (let i = 0; i < word.length; i++) {
      const slice = word.slice(0, i + 1);
      if (!nodes.includes(slice)) {
        nodes.push(slice);
        nodes_count += 1;
      }
    }
  }

  const response = { trie_nodes_count: nodes_count };
  res.send(response);
};
