import express from "express";
import MaintenanceController from "../app/Http/Controllers/Maintenance.controller";
import { authenticate, is } from "../app/Http/Middlewares/Auth.middleware";
import {
  createMaintenanceValidator,
  updateMaintenanceValidator,
} from "../app/Http/Validators/Maintenance.validator";
import { validatorHandler } from "../app/Http/Middlewares/validatorHandler";

const MaintenanceRoutes = express.Router();

MaintenanceRoutes.use(authenticate);

MaintenanceRoutes.get("/", is("admin"), MaintenanceController.list);
MaintenanceRoutes.get("/:slug", is("admin"), MaintenanceController.get);
MaintenanceRoutes.post(
  "/",
  is("admin"),
  createMaintenanceValidator,
  validatorHandler,
  MaintenanceController.create
);
MaintenanceRoutes.put(
  "/:slug",
  is("admin"),
  updateMaintenanceValidator,
  validatorHandler,
  MaintenanceController.update
);
MaintenanceRoutes.delete("/:slug", is("admin"), MaintenanceController.delete);

export default MaintenanceRoutes;

