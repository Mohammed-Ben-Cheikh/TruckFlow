import { NextFunction, Request, Response } from "express";
import Line from "../../models/Line";
import User from "../../models/User";

class DriverController {
  static async listDrivers(req: Request, res: Response, next: NextFunction) {
    try {
      const drivers = await User.find({ role: "employé", isActive: true }).select(
        "-password"
      );
      if (drivers.length === 0) {
        return res.error("Aucun chauffeur trouvé", 404);
      }
      return res.success({ drivers }, "Chauffeurs récupérés");
    } catch (error) {
      next(error);
    }
  }

  static async getDriver(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const driver = await User.findById(id).select("-password");
      if (!driver || driver.role !== "employé") {
        return res.error("Chauffeur introuvable", 404);
      }
      return res.success({ driver }, "Chauffeur récupéré");
    } catch (error) {
      next(error);
    }
  }

  static async getDriverLines(req: Request, res: Response, next: NextFunction) {
    try {
      const driverId =
        req.user?.role === "employé" ? req.user.userId : req.params.id;
      if (!driverId) {
        return res.error("ID du chauffeur manquant", 400);
      }
      const lines = await Line.find({ driver: driverId as any })
        .populate([{ path: "truck" }, { path: "trailer" }, { path: "driver" }])
        .sort({ createdAt: -1 });
      if (lines.length === 0) {
        return res.error("Aucun trajet trouvé pour ce chauffeur", 404);
      }
      return res.success({ lines }, "Trajets du chauffeur récupérés");
    } catch (error) {
      next(error);
    }
  }
}

export default DriverController;

