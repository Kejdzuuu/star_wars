import { model, Schema, Model, Document } from "mongoose";

interface ISpecies extends Document {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const SpeciesSchema: Schema = new Schema({
  name: { type: String, required: true },
  episode_id: { type: Number, required: true },
  classification: { type: String, required: true },
  designation: { type: String, required: true },
  average_height: { type: String, required: true },
  skin_colors: { type: String, required: true },
  hair_colors: { type: String, required: true },
  eye_colors: { type: String, required: true },
  average_lifespan: { type: String, required: true },
  homeworld: { type: String, required: true },
  language: { type: String, required: true },
  people: { type: [String], required: true },
  films: { type: [String], required: true },
  created: { type: String, required: true },
  edited: { type: String, required: true },
  url: { type: String, required: true },
});

const Species: Model<ISpecies> = model("Species", SpeciesSchema);

export default Species;
