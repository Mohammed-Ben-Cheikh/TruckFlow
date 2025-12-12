import { NextFunction, Request, Response } from "express";
import Line from "../../models/Line";

class TrackingController {
  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const { status } = req.body;
      if (!status) return res.error("Statut requis", 400);
      if (!slug) return res.error("Slug manquant", 400);

      const line = await Line.findOne({ slug });
      if (!line) return res.error("Trajet introuvable", 404);

      const driverId =
        (line as any).driver?._id?.toString?.() ??
        (line as any).driver?.toString?.();
      if (req.user?.role === "employé" && driverId !== req.user.userId) {
        return res.error("Accès non autorisé pour ce trajet", 403);
      }

      line.status = status;
      await line.save();
      return res.success({ line }, "Statut mis à jour");
    } catch (error) {
      next(error);
    }
  }

  static async updateProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const { kilometrageDepart, kilometrageArrive, fuelLiters, driverNotes } =
        req.body;
      if (!slug) return res.error("Slug manquant", 400);

      const line = await Line.findOne({ slug });
      if (!line) return res.error("Trajet introuvable", 404);

      const driverId =
        (line as any).driver?._id?.toString?.() ??
        (line as any).driver?.toString?.();
      if (req.user?.role === "employé" && driverId !== req.user.userId) {
        return res.error("Accès non autorisé pour ce trajet", 403);
      }

      if (kilometrageDepart !== undefined) line.kilometrageDepart = kilometrageDepart;
      if (kilometrageArrive !== undefined) line.kilometrageArrive = kilometrageArrive;
      if (fuelLiters !== undefined) line.fuelLiters = fuelLiters;
      if (driverNotes !== undefined) line.driverNotes = driverNotes;

      await line.save();
      return res.success({ line }, "Données du trajet mises à jour");
    } catch (error) {
      next(error);
    }
  }
}

export default TrackingController;

