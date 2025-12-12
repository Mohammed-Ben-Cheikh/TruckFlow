import { NextFunction, Request, Response } from "express";
import makeSlugFrom from "../../../utils/slug";
import Maintenance from "../../models/Maintenance";

class MaintenanceController {
  static async findMaintenance(slug: string, res: Response): Promise<any | null> {
    if (!slug) {
      res.error("Slug manquant", 400);
      return null;
    }
    const maintenance = await Maintenance.findOne({ slug }).populate([
      { path: "vehicle" },
      { path: "createdBy", select: "-password" },
    ]);
    if (!maintenance) {
      res.error("Maintenance introuvable", 404);
      return null;
    }
    return maintenance;
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const maintenances = await Maintenance.find()
        .populate([{ path: "vehicle" }, { path: "createdBy", select: "-password" }])
        .sort({ createdAt: -1 });
      if (maintenances.length === 0)
        return res.error("Aucune maintenance trouvée", 404);
      return res.success({ maintenances }, "Maintenances récupérées");
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const maintenance = await MaintenanceController.findMaintenance(slug!, res);
      return res.success({ maintenance }, "Maintenance récupérée");
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        vehicleType,
        vehicle,
        type,
        description,
        plannedAtKm,
        nextDueKm,
        dateStart,
        dateEnd,
        cost,
        parts,
        notes,
      } = req.body;

      if (!vehicleType || !vehicle || !type) {
        return res.error("Type de véhicule, identifiant et type sont requis", 400);
      }

      const slug = makeSlugFrom("maintenance", `${vehicleType}-${vehicle}`, true);
      const maintenance = new Maintenance({
        slug,
        vehicleType,
        vehicle,
        type,
        description,
        plannedAtKm,
        nextDueKm,
        dateStart,
        dateEnd,
        cost,
        parts,
        notes,
        createdBy: req.user?.userId,
      });
      await maintenance.save();
      return res.success({ maintenance }, "Maintenance créée", 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        vehicleType,
        vehicle,
        type,
        description,
        plannedAtKm,
        nextDueKm,
        dateStart,
        dateEnd,
        cost,
        parts,
        notes,
        status,
      } = req.body;
      const { slug } = req.params;
      const maintenance = await MaintenanceController.findMaintenance(slug!, res);
      if (!maintenance) return;

      if (vehicleType !== undefined) maintenance.vehicleType = vehicleType;
      if (vehicle !== undefined) maintenance.vehicle = vehicle;
      if (type !== undefined) maintenance.type = type;
      if (description !== undefined) maintenance.description = description;
      if (plannedAtKm !== undefined) maintenance.plannedAtKm = plannedAtKm;
      if (nextDueKm !== undefined) maintenance.nextDueKm = nextDueKm;
      if (dateStart !== undefined) maintenance.dateStart = dateStart;
      if (dateEnd !== undefined) maintenance.dateEnd = dateEnd;
      if (cost !== undefined) maintenance.cost = cost;
      if (parts !== undefined) maintenance.parts = parts;
      if (notes !== undefined) maintenance.notes = notes;
      if (status !== undefined) maintenance.status = status;

      await maintenance.save();
      return res.success({ maintenance }, "Maintenance mise à jour");
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const maintenance = await MaintenanceController.findMaintenance(slug!, res);
      if (!maintenance) return;
      await maintenance.deleteOne();
      return res.success({ maintenance }, "Maintenance supprimée");
    } catch (error) {
      next(error);
    }
  }
}

export default MaintenanceController;

