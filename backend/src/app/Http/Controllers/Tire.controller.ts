import { NextFunction, Request, Response } from "express";
import makeSlugFrom from "../../../utils/slug";
import Tire from "../../models/Tire";

class TireController {
  static async findTire(slug: string, res: Response) {
    if (!slug) return res.error("Slug manquant", 400);
    const tire = await Tire.findOne({ slug });
    if (!tire) return res.error("pneu introuvable", 404);
    return tire;
  }

  static async getTires(req: Request, res: Response, next: NextFunction) {
    try {
      const tires = await Tire.find();
      if (tires.length === 0) return res.error("Aucun pneu trouvé", 404);
      return res.success({ tires }, "pneus récupérés avec succès");
    } catch (error) {
      next(error);
    }
  }

  static async getTire(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const tire = await TireController.findTire(slug!, res);
      return res.success({ tire }, "pneu récupéré avec succès");
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
      const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
      if (
        used &&
        (kilometrageCurrent === undefined || kilometrageCurrent === null)
      ) {
        return res.error(
          "Le kilométrage actuel est requis pour un pneu d'occasion",
          400
        );
      }
      if (used && kilometrageCurrent <= 0) {
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
        img: imagePath,
      });
      await tire.save();
      return res.success({ tire }, "pneu créé avec succès", 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateTire(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        reference,
        brand,
        diameter,
        kilometrageMax,
        used,
        kilometrageCurrent,
      } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
      const { slug } = req.params;
      const tire = await TireController.findTire(slug!, res);
      if (!tire || !("inUse" in tire)) {
        return;
      }
      if (
        used &&
        (kilometrageCurrent === undefined || kilometrageCurrent === null)
      ) {
        return res.error(
          "Le kilométrage actuel est requis pour un pneu d'occasion",
          400
        );
      }
      if (used && kilometrageCurrent <= 0) {
        return res.error(
          "Le kilométrage actuel doit être supérieur à 0 pour un pneu d'occasion",
          400
        );
      }
      if (reference !== undefined) tire.reference = reference;
      if (brand !== undefined) tire.brand = brand;
      if (diameter !== undefined) tire.diameter = diameter;
      if (kilometrageMax !== undefined) tire.kilometrageMax = kilometrageMax;
      if (used !== undefined) tire.used = used;
      if (kilometrageCurrent !== undefined)
        tire.kilometrageCurrent = kilometrageCurrent;
      if (imagePath !== undefined) tire.img = imagePath;
      await tire.save();
      return res.success({ tire }, "pneu mis à jour avec succès");
    } catch (error) {
      next(error);
    }
  }
  static async deleteTire(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const tire = await TireController.findTire(slug!, res);
      if (!tire || !("inUse" in tire)) {
        return;
      }
      if (tire.inUse) {
        return res.error(
          "Impossible de supprimer un pneu en cours d'utilisation",
          400
        );
      }
      await tire.deleteOne();
      return res.success({ tire }, "pneu supprimé avec succès");
    } catch (error) {
      next(error);
    }
  }
}
export default TireController;
