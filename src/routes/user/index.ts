import express from "express";
import filmsRouter from "./films";
import planetRouter from "./planet";
import speciesRouter from "./species";
import starshipsRouter from "./starships";
import vehiclesRouter from "./vehicles";
import { user_auth } from "../../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", (_req, res) => {
  res.send("User");
});

userRouter.use("/", user_auth);
userRouter.use("/films", filmsRouter);
userRouter.use("/species", speciesRouter);
userRouter.use("/starships", starshipsRouter);
userRouter.use("/vehicles", vehiclesRouter);
userRouter.use("/planet", planetRouter);
userRouter.use("/homeworld", planetRouter);

export default userRouter;
