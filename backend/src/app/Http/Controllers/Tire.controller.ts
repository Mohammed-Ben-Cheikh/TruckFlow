import { NextFunction, Request, Response } from "express";
import makeSlugFrom from "../../../utils/slug";
import Tire from "../../models/Tire";

class TireController {
  static async getTires(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
  static async getTire(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      if (!slug) {
        return res.error("Slug manquant", 400);
      }
      const tire = await Tire.findOne({ slug });
      if (!tire) {
        return res.error("Tire introuvable", 404);
      }
      return res.success({ tire }, "Tire récupérée avec succès");
    } catch (error) {
      next(error);
    }
  }
  static async createTire(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        reference,
        brand,
        diameter,
        kilometrageMax,
        used,
        kilometrageCurrent,
      } = req.body;
      if (used && kilometrageCurrent === 0) {
        return res.error(
          "Le kilométrage actuel doit être supérieur à 0 pour un pneu d'occasion",
          400
        );
      }
      const slug = makeSlugFrom("tire", reference, true);
      const tire = new Tire({
        slug,
        reference,
        brand,
        diameter,
        kilometrageMax,
        used,
        kilometrageCurrent,
      });
      await tire.save();
      return res.success({ tire }, "Tire créée avec succès", 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateTire(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      if (!slug) {
        return res.error("Slug manquant", 400);
      }
      const tire = await Tire.findOne({ slug });
      if (!tire) {
        return res.error("Tire introuvable", 404);
      }
      return res.success({ tire }, "Tire récupérée avec succès");
    } catch (error) {
      next(error);
    }
  }
  static async deleteTire(req: Request, res: Response, next: NextFunction) {}
}
export default TireController;
