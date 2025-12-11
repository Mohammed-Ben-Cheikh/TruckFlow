import express from "express";
import TrailerController from "../app/Http/Controllers/Trailer.controller";

const TrailerRoutes = express.Router();

TrailerRoutes.get("/", TrailerController.getTrailers);
TrailerRoutes.get("/:slug", TrailerController.getTrailer);
TrailerRoutes.post("/", TrailerController.createTrailer);
TrailerRoutes.put("/:slug", TrailerController.updateTrailer);
TrailerRoutes.delete("/:slug", TrailerController.deleteTrailer);

export default TrailerRoutes;
