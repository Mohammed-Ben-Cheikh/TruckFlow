import express from "express";
import TrackingController from "../app/Http/Controllers/Tracking.controller";
import { authenticate, is } from "../app/Http/Middlewares/Auth.middleware";
import {
  updateProgressValidator,
  updateStatusValidator,
} from "../app/Http/Validators/Tracking.validator";
import { validatorHandler } from "../app/Http/Middlewares/validatorHandler";

const TrackingRoutes = express.Router();

TrackingRoutes.use(authenticate);

TrackingRoutes.patch(
  "/:slug/status",
  is(["admin", "employé"]),
  updateStatusValidator,
  validatorHandler,
  TrackingController.updateStatus
);
TrackingRoutes.patch(
  "/:slug/progress",
  is(["admin", "employé"]),
  updateProgressValidator,
  validatorHandler,
  TrackingController.updateProgress
);

export default TrackingRoutes;

