import express from "express";
import * as filmsService from "../services/films";
import * as speciesService from "../services/species";
import * as starshipsService from "../services/starships";
import * as vehiclesService from "../services/vehicles";
import * as planetsService from "../services/planets";
import {
  apiUrlFilms,
  apiUrlPlanets,
  apiUrlSpecies,
  apiUrlStarships,
  apiUrlVehicles,
  ITEMS_PER_PAGE,
  TIME_TO_STALE,
} from "../constants";

import Query from "../models/query";
import Planet from "../models/planet";
import Film from "../models/film";
import Species from "../models/species";
import Starship from "../models/starship";
import Vehicle from "../models/vehicle";
const jwt = require("jsonwebtoken");

export const get_film = async (url: string) => {
  const id = getIdFromUrl(url, apiUrlFilms);
  const query = `/films/${id}`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Film.findOne({ url });
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await filmsService.getOne(id);
    if (result) {
      Film.findOneAndUpdate(
        { url: result.url },
        result,
        { upsert: true },
        (err, returned_query) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    return result;
  }
};

export const get_all_films = async () => {
  const query = `/films`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Film.find({}, {}, { sort: { url: "asc" } });
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await filmsService.getAll();
    if (result) {
      for (let film of result) {
        Film.findOneAndUpdate(
          { url: film.url },
          film,
          { upsert: true },
          (err, returned_query) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    return result;
  }
};

export const get_films_page = async (page: number) => {
  const query = `/films/page/${page}`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Film.find(
      {},
      {},
      {
        sort: { url: "asc" },
        limit: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
      }
    );
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await filmsService.getPage(page.toString());
    if (result) {
      for (let film of result) {
        Film.findOneAndUpdate(
          { url: film.url },
          film,
          { upsert: true },
          (err, returned_query) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    return result;
  }
};

export const get_species = async (url: string) => {
  const id = getIdFromUrl(url, apiUrlSpecies);
  const query = `/species/${id}`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Species.findOne({ url });
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await speciesService.getOne(id);
    if (result) {
      Species.findOneAndUpdate(
        { url: result.url },
        result,
        { upsert: true },
        (err, returned_query) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    return result;
  }
};

export const get_all_species = async () => {
  const query = `/species`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Species.find({}, {}, { sort: { url: "asc" } });
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await speciesService.getAll();
    if (result) {
      for (let species of result) {
        Species.findOneAndUpdate(
          { url: species.url },
          species,
          { upsert: true },
          (err, returned_query) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    return result;
  }
};

export const get_species_page = async (page: number) => {
  const query = `/species/page/${page}`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Species.find(
      {},
      {},
      {
        sort: { url: "asc" },
        limit: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
      }
    );
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await speciesService.getPage(page.toString());
    if (result) {
      for (let species of result) {
        Species.findOneAndUpdate(
          { url: species.url },
          species,
          { upsert: true },
          (err, returned_query) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    return result;
  }
};

export const get_vehicle = async (url: string) => {
  const id = getIdFromUrl(url, apiUrlVehicles);
  const query = `/vehicles/${id}`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Vehicle.findOne({ url });
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await vehiclesService.getOne(id);
    if (result) {
      Vehicle.findOneAndUpdate(
        { url: result.url },
        result,
        { upsert: true },
        (err, returned_query) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    return result;
  }
};

export const get_all_vehicles = async () => {
  const query = `/vehicles`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Vehicle.find({}, {}, { sort: { url: "asc" } });
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await vehiclesService.getAll();
    if (result) {
      for (let vehicle of result) {
        Vehicle.findOneAndUpdate(
          { url: vehicle.url },
          vehicle,
          { upsert: true },
          (err, returned_query) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    return result;
  }
};

export const get_vehicles_page = async (page: number) => {
  const query = `/vehicles`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Vehicle.find(
      {},
      {},
      {
        sort: { url: "asc" },
        limit: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
      }
    );
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await vehiclesService.getPage(page.toString());
    if (result) {
      for (let vehicle of result) {
        Vehicle.findOneAndUpdate(
          { url: vehicle.url },
          vehicle,
          { upsert: true },
          (err, returned_query) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    return result;
  }
};

export const get_starship = async (url: string) => {
  const id = getIdFromUrl(url, apiUrlStarships);
  const query = `/starships/${id}`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Starship.findOne({ url });
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await starshipsService.getOne(id);
    if (result) {
      Starship.findOneAndUpdate(
        { url: result.url },
        result,
        { upsert: true },
        (err, returned_query) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    return result;
  }
};

export const get_all_starships = async () => {
  const query = `/starships`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Starship.find({}, {}, { sort: { url: "asc" } });
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await starshipsService.getAll();
    if (result) {
      for (let starship of result) {
        Starship.findOneAndUpdate(
          { url: starship.url },
          starship,
          { upsert: true },
          (err, returned_query) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    return result;
  }
};

export const get_starships_page = async (page: number) => {
  const query = `/starships/page/${page}`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Starship.find(
      {},
      {},
      {
        sort: { url: "asc" },
        limit: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
      }
    );
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await starshipsService.getPage(page.toString());
    if (result) {
      for (let starship of result) {
        Starship.findOneAndUpdate(
          { url: starship.url },
          starship,
          { upsert: true },
          (err, returned_query) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    return result;
  }
};

export const get_planet = async (url: string) => {
  const id = getIdFromUrl(url, apiUrlPlanets);
  const query = `/planets/${id}`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Planet.findOne({ url });
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await planetsService.getOne(id);
    if (result) {
      Planet.findOneAndUpdate(
        { url: result.url },
        result,
        { upsert: true },
        (err, returned_query) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    return result;
  }
};

export const get_all_planets = async () => {
  const query = `/planets`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Planet.find({}, {}, { sort: { url: "asc" } });
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await planetsService.getAll();
    if (result) {
      for (let planet of result) {
        Planet.findOneAndUpdate(
          { url: planet.url },
          planet,
          { upsert: true },
          (err, returned_query) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    return result;
  }
};

export const get_planets_page = async (page: number) => {
  const query = `/planets/page/${page}`;

  if (await isDataInDB(query)) {
    console.log("getting from db");
    const result = await Planet.find(
      {},
      {},
      {
        sort: { url: "asc" },
        limit: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
      }
    );
    return result;
  } else {
    console.log("fetching from swapi");
    const newQuery = new Query({
      query,
      timestamp: new Date(),
    });
    const queryObject = newQuery.toObject();
    delete queryObject._id;
    Query.findOneAndUpdate(
      { query },
      queryObject,
      { upsert: true },
      (err, returned_query) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const result = await planetsService.getPage(page.toString());
    if (result) {
      for (let planet of result) {
        Planet.findOneAndUpdate(
          { url: planet.url },
          planet,
          { upsert: true },
          (err, returned_query) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
    return result;
  }
};

export const isTimestampRecent = (timestamp: Date) => {
  const now = new Date();
  const time_passed = now.getTime() - timestamp.getTime();
  if (time_passed < TIME_TO_STALE) {
    return true;
  } else {
    return false;
  }
};

export const getToken = (req: express.Request) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
};

export const getIdFromUrl = (url: string, baseUrl: string) => {
  const slices = url.split("/");
  if (url.endsWith("/")) {
    return slices[slices.length - 2];
  }
  return slices[slices.length - 1];
};

export const isDataInDB = async (query: string) => {
  const queryInDB = await Query.findOne({ query });
  if (queryInDB && isTimestampRecent(queryInDB.timestamp)) {
    return true;
  } else {
    return false;
  }
};
