import { model, Schema, Model, Document } from "mongoose";

interface IPlanet extends Document {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const PlanetSchema: Schema = new Schema({
  name: { type: String, required: true },
  episode_id: { type: Number, required: true },
  rotation_period: { type: String, required: true },
  orbital_period: { type: String, required: true },
  diameter: { type: String, required: true },
  climate: { type: String, required: true },
  gravity: { type: String, required: true },
  terrain: { type: String, required: true },
  surface_water: { type: String, required: true },
  population: { type: String, required: true },
  residents: { type: [String], required: true },
  films: { type: [String], required: true },
  created: { type: String, required: true },
  edited: { type: String, required: true },
  url: { type: String, required: true },
});

const Planet: Model<IPlanet> = model("Planet", PlanetSchema);

export default Planet;
