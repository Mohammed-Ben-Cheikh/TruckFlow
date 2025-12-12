import express from "express";
import DriverController from "../app/Http/Controllers/Driver.controller";
import { authenticate, is } from "../app/Http/Middlewares/Auth.middleware";
import { driverIdParamValidator } from "../app/Http/Validators/Driver.validator";
import { validatorHandler } from "../app/Http/Middlewares/validatorHandler";

const DriverRoutes = express.Router();

DriverRoutes.use(authenticate);

DriverRoutes.get("/", is("admin"), DriverController.listDrivers);
DriverRoutes.get(
  "/:id",
  is("admin"),
  driverIdParamValidator,
  validatorHandler,
  DriverController.getDriver
);
DriverRoutes.get(
  "/:id/lines",
  is(["admin", "employé"]),
  driverIdParamValidator,
  validatorHandler,
  DriverController.getDriverLines
);

export default DriverRoutes;

