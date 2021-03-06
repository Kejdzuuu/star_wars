import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
var logger = require("morgan");
require("dotenv").config();

import filmsRouter from "./routes/films";
import planetsRouter from "./routes/planets";
import speciesRouter from "./routes/species";
import starshipsRouter from "./routes/starships";
import vehiclesRouter from "./routes/vehicles";
import peopleRouter from "./routes/people";
import signupRouter from "./routes/signup";
import loginRouter from "./routes/login";
import userRouter from "./routes/user";
import openingCrawlRouter from "./routes/openingCrawl";

const unknownEndpoint = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const app = express();
const port = process.env.PORT;
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.use(logger("dev"));
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
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/opening_crawl", openingCrawlRouter);

app.use(unknownEndpoint);

app.listen(port, () => {
  return console.log(`server listening on port ${port}`);
});
