import express from "express";
import TruckController from "../app/Http/Controllers/Truck.controller";
import { authenticate, is } from "../app/Http/Middlewares/Auth.middleware";
import {
  createTruckValidator,
  updateTruckValidator,
} from "../app/Http/Validators/Truck.validator";
import { validatorHandler } from "../app/Http/Middlewares/validatorHandler";
import upload from "../app/Http/Middlewares/upload";

const TruckRoutes = express.Router();

TruckRoutes.use(authenticate);

TruckRoutes.get("/", is(["admin"]), TruckController.getTrucks);
TruckRoutes.get("/:slug", is(["admin"]), TruckController.getTruck);
TruckRoutes.post(
  "/",
  is(["admin"]),
  upload.single("image"),
  createTruckValidator,
  validatorHandler,
  TruckController.createTruck
);
TruckRoutes.put(
  "/:slug",
  is(["admin"]),
  upload.single("image"),
  updateTruckValidator,
  validatorHandler,
  TruckController.updateTruck
);
TruckRoutes.delete("/:slug", is(["admin"]), TruckController.deleteTruck);

export default TruckRoutes;