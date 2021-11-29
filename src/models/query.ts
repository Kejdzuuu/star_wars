import { model, Schema, Model, Document } from "mongoose";

interface IQuery extends Document {
  query: string;
  timestamp: Date;
}

const QuerySchema: Schema = new Schema({
  query: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const Query: Model<IQuery> = model("Query", QuerySchema);

export default Query;
