import { model, Schema, Model, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  passwordHash: string;
  character_name: string;
  character_id: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  character_name: { type: String, required: true },
  character_id: { type: String, required: true },
});

const User: Model<IUser> = model("User", UserSchema);

export default User;
