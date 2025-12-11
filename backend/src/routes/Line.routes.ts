import express from "express";
import LineController from "../app/Http/Controllers/Line.controller";

const LineRoutes = express.Router();

LineRoutes.get("/", LineController.getLines);
LineRoutes.get("/:slug", LineController.getLine);
LineRoutes.post("/", LineController.createLine);
LineRoutes.put("/:slug", LineController.updateLine);
LineRoutes.delete("/:slug", LineController.deleteLine);

export default LineRoutes;
