import { model, Schema, Model, Document } from "mongoose";

interface IVehicle extends Document {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

const VehicleSchema: Schema = new Schema({
  name: { type: String, required: true },
  episode_id: { type: Number, required: true },
  model: { type: String, required: true },
  manufacturer: { type: String, required: true },
  cost_in_credits: { type: String, required: true },
  length: { type: String, required: true },
  max_atmosphering_speed: { type: String, required: true },
  crew: { type: String, required: true },
  passengers: { type: String, required: true },
  cargo_capacity: { type: String, required: true },
  consumables: { type: String, required: true },
  vehicle_class: { type: String, required: true },
  pilots: { type: [String], required: true },
  films: { type: [String], required: true },
  created: { type: String, required: true },
  edited: { type: String, required: true },
  url: { type: String, required: true },
});

const Vehicle: Model<IVehicle> = model("Vehicle", VehicleSchema);

export default Vehicle;
