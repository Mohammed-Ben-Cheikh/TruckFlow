import express from "express";
import LineController from "../app/Http/Controllers/Line.controller";
import { authenticate, is } from "../app/Http/Middlewares/Auth.middleware";
import {
  createLineValidator,
  updateLineValidator,
} from "../app/Http/Validators/Line.validator";
import { validatorHandler } from "../app/Http/Middlewares/validatorHandler";

const LineRoutes = express.Router();

LineRoutes.use(authenticate);

LineRoutes.get("/", is(["admin", "employé"]), LineController.getLines);
LineRoutes.get("/:slug", is(["admin", "employé"]), LineController.getLine);
LineRoutes.post(
  "/",
  is(["admin"]),
  createLineValidator,
  validatorHandler,
  LineController.createLine
);
LineRoutes.put(
  "/:slug",
  is(["admin"]),
  updateLineValidator,
  validatorHandler,
  LineController.updateLine
);
LineRoutes.delete("/:slug", is(["admin"]), LineController.deleteLine);

export default LineRoutes;
