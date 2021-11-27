import express from "express";
import filmsRouter from "./films";

const userRouter = express.Router();

userRouter.get("/", (_req, res) => {
  res.send("User");
});

userRouter.use("/films", filmsRouter);

export default userRouter;
