import { NextFunction, Request, Response } from "express";
import makeSlugFrom from "../../../utils/slug";
import Line from "../../models/Line";

class LineController {
  static async findLine(slug: string, res: Response): Promise<any | null> {
    if (!slug) {
      res.error("Slug manquant", 400);
      return null;
    }
    const line = await Line.findOne({ slug }).populate([
      { path: "truck" },
      { path: "trailer" },
      { path: "driver", select: "-password" },
    ]);
    if (!line) {
      res.error("Ligne introuvable", 404);
      return null;
    }
    return line;
  }

  static async getLines(req: Request, res: Response, next: NextFunction) {
    try {
      const filter =
        req.user?.role === "employé"
          ? { driver: req.user.userId }
          : undefined;
      const lines = await Line.find(filter || {})
        .populate([{ path: "truck" }, { path: "trailer" }, { path: "driver" }])
        .sort({ createdAt: -1 });
      if (lines.length === 0) return res.error("Aucune ligne trouvée", 404);
      return res.success({ lines }, "lignes récupérées avec succès");
    } catch (error) {
      next(error);
    }
  }

  static async getLine(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const line = await LineController.findLine(slug!, res);
      if (req.user?.role === "employé" && line && line.driver) {
        const driverId =
          (line as any).driver?._id?.toString?.() ??
          (line as any).driver?.toString?.();
        if (driverId && driverId !== req.user.userId) {
          return res.error("Accès non autorisé à cette ligne", 403);
        }
      }
      return res.success({ line }, "ligne récupérée avec succès");
    } catch (error) {
      next(error);
    }
  }

  static async createLine(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        code,
        truck,
        trailer,
        driver,
        departLocation,
        arriveLocation,
        status,
        kilometrageDepart,
        fuelLiters,
        pdfUrl,
        driverNotes,
      } = req.body;
      if (!code || !truck || !driver) {
        return res.error("Code, camion et chauffeur sont requis", 400);
      }
      const slug = makeSlugFrom("line", code, true);
      const line = new Line({
        slug,
        code,
        truck,
        trailer: trailer || null,
        driver,
        departLocation,
        arriveLocation,
        status,
        kilometrageDepart,
        fuelLiters,
        pdfUrl,
        driverNotes,
      });
      await line.save();
      return res.success({ line }, "ligne créée avec succès", 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateLine(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        code,
        truck,
        trailer,
        driver,
        departLocation,
        arriveLocation,
        status,
        kilometrageDepart,
        kilometrageArrive,
        fuelLiters,
        pdfUrl,
        driverNotes,
      } = req.body;
      const { slug } = req.params;
      const line = await LineController.findLine(slug!, res);
      if (!line) return;

      if (code !== undefined) line.code = code;
      if (truck !== undefined) line.truck = truck;
      if (trailer !== undefined) line.trailer = trailer;
      if (driver !== undefined) line.driver = driver;
      if (departLocation !== undefined) line.departLocation = departLocation;
      if (arriveLocation !== undefined) line.arriveLocation = arriveLocation;
      if (status !== undefined) line.status = status;
      if (kilometrageDepart !== undefined)
        line.kilometrageDepart = kilometrageDepart;
      if (kilometrageArrive !== undefined)
        line.kilometrageArrive = kilometrageArrive;
      if (fuelLiters !== undefined) line.fuelLiters = fuelLiters;
      if (pdfUrl !== undefined) line.pdfUrl = pdfUrl;
      if (driverNotes !== undefined) line.driverNotes = driverNotes;

      await line.save();
      return res.success({ line }, "ligne mise à jour avec succès");
    } catch (error) {
      next(error);
    }
  }

  static async deleteLine(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const line = await LineController.findLine(slug!, res);
      if (!line) return;
      await line.deleteOne();
      return res.success({ line }, "ligne supprimée avec succès");
    } catch (error) {
      next(error);
    }
  }
}
export default LineController;
