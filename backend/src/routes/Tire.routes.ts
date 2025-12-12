import express from "express";
import TireController from "../app/Http/Controllers/Tire.controller";
import { authenticate, is } from "../app/Http/Middlewares/Auth.middleware";
import {
  createTireValidator,
  updateTireValidator,
} from "../app/Http/Validators/Tire.validator";
import { validatorHandler } from "../app/Http/Middlewares/validatorHandler";
import upload from "../app/Http/Middlewares/upload";

const TireRoutes = express.Router();

TireRoutes.use(authenticate);

TireRoutes.get("/", is(["admin"]), TireController.getTires);
TireRoutes.get("/:slug", is(["admin"]), TireController.getTire);
TireRoutes.post(
  "/",
  is(["admin"]),
  upload.single("image"),
  createTireValidator,
  validatorHandler,
  TireController.createTire
);
TireRoutes.put(
  "/:slug",
  is(["admin"]),
  upload.single("image"),
  updateTireValidator,
  validatorHandler,
  TireController.updateTire
);
TireRoutes.delete("/:slug", is(["admin"]), TireController.deleteTire);

export default TireRoutes;
