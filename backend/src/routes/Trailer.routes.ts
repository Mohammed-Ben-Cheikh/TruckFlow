import express from "express";
import TrailerController from "../app/Http/Controllers/Trailer.controller";
import { authenticate, is } from "../app/Http/Middlewares/Auth.middleware";
import {
  createTrailerValidator,
  updateTrailerValidator,
} from "../app/Http/Validators/Trailer.validator";
import { validatorHandler } from "../app/Http/Middlewares/validatorHandler";
import upload from "../app/Http/Middlewares/upload";

const TrailerRoutes = express.Router();

TrailerRoutes.use(authenticate);

TrailerRoutes.get("/", is(["admin"]), TrailerController.getTrailers);
TrailerRoutes.get("/:slug", is(["admin"]), TrailerController.getTrailer);
TrailerRoutes.post(
  "/",
  is(["admin"]),
  upload.single("image"),
  createTrailerValidator,
  validatorHandler,
  TrailerController.createTrailer
);
TrailerRoutes.put(
  "/:slug",
  is(["admin"]),
  upload.single("image"),
  updateTrailerValidator,
  validatorHandler,
  TrailerController.updateTrailer
);
TrailerRoutes.delete("/:slug", is(["admin"]), TrailerController.deleteTrailer);

export default TrailerRoutes;
