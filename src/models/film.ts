import { model, Schema, Model, Document } from "mongoose";

interface IFilm extends Document {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

const FilmSchema: Schema = new Schema({
  title: { type: String, required: true },
  episode_id: { type: Number, required: true },
  opening_crawl: { type: String, required: true },
  director: { type: String, required: true },
  producer: { type: String, required: true },
  release_date: { type: String, required: true },
  characters: { type: [String], required: true },
  planets: { type: [String], required: true },
  starships: { type: [String], required: true },
  vehicles: { type: [String], required: true },
  species: { type: [String], required: true },
  created: { type: String, required: true },
  edited: { type: String, required: true },
  url: { type: String, required: true },
});

const Film: Model<IFilm> = model("Film", FilmSchema);

export default Film;
