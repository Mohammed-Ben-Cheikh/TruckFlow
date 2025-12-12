import { NextFunction, Request, Response } from "express";
import makeSlugFrom from "../../../utils/slug";
import Truck from "../../models/Truck";

class TruckController {
  static async findTruck(slug: string, res: Response): Promise<any | null> {
    if (!slug) {
      res.error("Slug manquant", 400);
      return null;
    }
    const truck = await Truck.findOne({ slug });
    if (!truck) {
      res.error("Camion introuvable", 404);
      return null;
    }
    return truck;
  }

  static async getTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      const trucks = await Truck.find();
      if (trucks.length === 0) return res.error("Aucun camion trouvé", 404);
      return res.success({ trucks }, "camions récupérés avec succès");
    } catch (error) {
      next(error);
    }
  }

  static async getTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const truck = await TruckController.findTruck(slug!, res);
      return res.success({ truck }, "camion récupéré avec succès");
    } catch (error) {
      next(error);
    }
  }

  static async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        registration,
        brand,
        model,
        status,
        kilometrage,
        lastOilChangeKm,
        lastRevisionKm,
      } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

      if (!registration || !brand || !model) {
        return res.error("Matricule, marque et modèle sont requis", 400);
      }

      const slug = makeSlugFrom("truck", registration, true);
      const truck = new Truck({
        slug,
        registration,
        brand,
        model,
        status,
        kilometrage,
        lastOilChangeKm,
        lastRevisionKm,
        img: imagePath,
      });
      await truck.save();
      return res.success({ truck }, "camion créé avec succès", 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        registration,
        brand,
        model,
        status,
        kilometrage,
        lastOilChangeKm,
        lastRevisionKm,
      } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
      const { slug } = req.params;
      const truck = await TruckController.findTruck(slug!, res);
      if (!truck) return;

      if (registration !== undefined) truck.registration = registration;
      if (brand !== undefined) truck.brand = brand;
      if (model !== undefined) truck.model = model;
      if (status !== undefined) truck.status = status;
      if (kilometrage !== undefined) truck.kilometrage = kilometrage;
      if (lastOilChangeKm !== undefined) truck.lastOilChangeKm = lastOilChangeKm;
      if (lastRevisionKm !== undefined) truck.lastRevisionKm = lastRevisionKm;
      if (imagePath !== undefined) truck.img = imagePath;

      await truck.save();
      return res.success({ truck }, "camion mis à jour avec succès");
    } catch (error) {
      next(error);
    }
  }

  static async deleteTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const truck = await TruckController.findTruck(slug!, res);
      if (!truck) return;
      if (truck.status === "on_trip" || truck.status === "maintenance") {
        return res.error(
          "Impossible de supprimer un camion en cours d'utilisation ou en maintenance",
          400
        );
      }
      await truck.deleteOne();
      return res.success({ truck }, "camion supprimé avec succès");
    } catch (error) {
      next(error);
    }
  }
}
export default TruckController;
