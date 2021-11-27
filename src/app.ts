import express from "express";
import filmsRouter from "./routes/films";
import planetsRouter from "./routes/planets";
import speciesRouter from "./routes/species";
import starshipsRouter from "./routes/starships";
import vehiclesRouter from "./routes/vehicles";
import peopleRouter from "./routes/people";
import usersRouter from "./routes/users";
import mongoose, { ConnectOptions } from "mongoose";
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.send("Star Wars");
});

app.use("/films", filmsRouter);
app.use("/planets", planetsRouter);
app.use("/species", speciesRouter);
app.use("/starships", starshipsRouter);
app.use("/vehicles", vehiclesRouter);
app.use("/people", peopleRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  return console.log(`server listening on port ${port}`);
});
