import express from "express";

import filmsRouter from "./routes/films";
import planetsRouter from "./routes/planets";
import speciesRouter from "./routes/species";
import starshipsRouter from "./routes/starships";
import vehiclesRouter from "./routes/vehicles";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Star Wars");
});

app.use("/films", filmsRouter);
app.use("/planets", planetsRouter);
app.use("/species", speciesRouter);
app.use("/starships", starshipsRouter);
app.use("/vehicles", vehiclesRouter);

app.listen(port, () => {
  return console.log(`server listening on port ${port}`);
});
