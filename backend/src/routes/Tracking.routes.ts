import express from "express";
import TrackingController from "../app/Http/Controllers/Tracking.controller";
import { authenticate, is } from "../app/Http/Middlewares/Auth.middleware";
import { validatorHandler } from "../app/Http/Middlewares/validatorHandler";
import {
  updateProgressValidator,
  updateStatusValidator,
} from "../app/Http/Validators/Tracking.validator";

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

// Tracking CRUD
TrackingRoutes.get("/", is(["admin", "employé"]), TrackingController.list);
TrackingRoutes.post("/", is(["admin", "employé"]), TrackingController.create);
TrackingRoutes.get("/:slug", is(["admin", "employé"]), TrackingController.get);
TrackingRoutes.put(
  "/:slug",
  is(["admin", "employé"]),
  TrackingController.update
);
TrackingRoutes.delete(
  "/:slug",
  is(["admin", "employé"]),
  TrackingController.delete
);

export default TrackingRoutes;
