import { NextFunction, Request, Response } from "express";
import makeSlugFrom from "../../../utils/slug";
import Trailer from "../../models/Trailer";

class TrailerController {
  static async findTrailer(slug: string, res: Response): Promise<any | null> {
    if (!slug) {
      res.error("Slug manquant", 400);
      return null;
    }
    const trailer = await Trailer.findOne({ slug });
    if (!trailer) {
      res.error("Remorque introuvable", 404);
      return null;
    }
    return trailer;
  }

  static async getTrailers(req: Request, res: Response, next: NextFunction) {
    try {
      const trailers = await Trailer.find();
      if (trailers.length === 0)
        return res.error("Aucune remorque trouvée", 404);
      return res.success({ trailers }, "remorques récupérées avec succès");
    } catch (error) {
      next(error);
    }
  }

  static async getTrailer(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const trailer = await TrailerController.findTrailer(slug!, res);
      return res.success({ trailer }, "remorque récupérée avec succès");
    } catch (error) {
      next(error);
    }
  }

  static async createTrailer(req: Request, res: Response, next: NextFunction) {
    try {
      const { registration, brand, type, status, kilometrage } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
      if (!registration || !brand || !type) {
        return res.error("Matricule, marque et type sont requis", 400);
      }
      const slug = makeSlugFrom("trailer", registration, true);
      const trailer = new Trailer({
        slug,
        registration,
        brand,
        type,
        status,
        kilometrage,
        img: imagePath,
      });
      await trailer.save();
      return res.success({ trailer }, "remorque créée avec succès", 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateTrailer(req: Request, res: Response, next: NextFunction) {
    try {
      const { registration, brand, type, status, kilometrage } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
      const { slug } = req.params;
      const trailer = await TrailerController.findTrailer(slug!, res);
      if (!trailer) return;
      if (registration !== undefined) trailer.registration = registration;
      if (brand !== undefined) trailer.brand = brand;
      if (type !== undefined) trailer.type = type;
      if (status !== undefined) trailer.status = status;
      if (kilometrage !== undefined) trailer.kilometrage = kilometrage;
      if (imagePath !== undefined) trailer.img = imagePath;
      await trailer.save();
      return res.success({ trailer }, "remorque mise à jour avec succès");
    } catch (error) {
      next(error);
    }
  }

  static async deleteTrailer(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const trailer = await TrailerController.findTrailer(slug!, res);
      if (!trailer) return;
      if (trailer.status === "on_trip" || trailer.status === "maintenance") {
        return res.error(
          "Impossible de supprimer une remorque en cours d'utilisation ou en maintenance",
          400
        );
      }
      await trailer.deleteOne();
      return res.success({ trailer }, "remorque supprimée avec succès");
    } catch (error) {
      next(error);
    }
  }
}
export default TrailerController;
