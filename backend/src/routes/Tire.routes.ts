import express from "express";
import TireController from "../app/Http/Controllers/Tire.controller";

const TireRoutes = express.Router();

TireRoutes.get("/", TireController.getTires);
TireRoutes.get("/:slug", TireController.getTire);
TireRoutes.post("/", TireController.createTire);
TireRoutes.put("/:slug", TireController.updateTire);
TireRoutes.delete("/:slug", TireController.deleteTire);

export default TireRoutes;
