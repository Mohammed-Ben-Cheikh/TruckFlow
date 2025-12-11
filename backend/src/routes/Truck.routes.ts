import express from 'express';
import TruckController from '../app/Http/Controllers/Truck.controller';

const TruckRoutes = express.Router();

TruckRoutes.get('/', TruckController.getTrucks);
TruckRoutes.get("/:slug", TruckController.getTruck);
TruckRoutes.post('/', TruckController.createTruck);
TruckRoutes.put("/:slug", TruckController.updateTruck);
TruckRoutes.delete("/:slug", TruckController.deleteTruck);

export default TruckRoutes;