import { NextFunction, Request, Response } from "express";
import makeSlugFrom from "../../../utils/slug";
import Line from "../../models/Line";
import Tracking from "../../models/Tracking";

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

      if (kilometrageDepart !== undefined)
        line.kilometrageDepart = kilometrageDepart;
      if (kilometrageArrive !== undefined)
        line.kilometrageArrive = kilometrageArrive;
      if (fuelLiters !== undefined) line.fuelLiters = fuelLiters;
      if (driverNotes !== undefined) line.driverNotes = driverNotes;

      await line.save();
      return res.success({ line }, "Données du trajet mises à jour");
    } catch (error) {
      next(error);
    }
  }
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const trackings = await Tracking.find()
        .populate([
          { path: "line" },
          { path: "vehicle" },
          { path: "createdBy", select: "-password" },
        ])
        .sort({ createdAt: -1 });
      if (trackings.length === 0)
        return res.success({ trackings: [] }, "Aucun point de suivi");
      return res.success({ trackings }, "trackings récupérés");
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { line, vehicle, location, lat, lon, timestamp } = req.body;
      if (!location && (lat === undefined || lon === undefined)) {
        return res.error("Location ou lat/lon requis", 400);
      }
      const slug = makeSlugFrom("tracking", location || `${lat}-${lon}`, true);
      const tracking = new Tracking({
        slug,
        line: line || null,
        vehicle: vehicle || null,
        location: location || null,
        lat: lat ?? null,
        lon: lon ?? null,
        timestamp: timestamp ? new Date(timestamp) : undefined,
        createdBy: req.user?.userId || null,
      });
      await tracking.save();
      return res.success({ tracking }, "Point de suivi créé", 201);
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      if (!slug) return res.error("Slug manquant", 400);
      const tracking = await Tracking.findOne({ slug }).populate([
        { path: "line" },
        { path: "vehicle" },
        { path: "createdBy", select: "-password" },
      ]);
      if (!tracking) return res.error("Point de suivi introuvable", 404);
      return res.success({ tracking }, "Point récupéré");
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const { location, lat, lon, timestamp } = req.body;
      if (!slug) return res.error("Slug manquant", 400);
      const tracking = await Tracking.findOne({ slug });
      if (!tracking) return res.error("Point de suivi introuvable", 404);
      if (location !== undefined) tracking.location = location;
      if (lat !== undefined) tracking.lat = lat;
      if (lon !== undefined) tracking.lon = lon;
      if (timestamp !== undefined) tracking.timestamp = new Date(timestamp);
      await tracking.save();
      return res.success({ tracking }, "Point mis à jour");
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      if (!slug) return res.error("Slug manquant", 400);
      const tracking = await Tracking.findOne({ slug });
      if (!tracking) return res.error("Point de suivi introuvable", 404);
      await tracking.deleteOne();
      return res.success({ tracking }, "Point supprimé");
    } catch (error) {
      next(error);
    }
  }
}

export default TrackingController;
