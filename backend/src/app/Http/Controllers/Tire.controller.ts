import { NextFunction, Request, Response } from "express";
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
    } catch (error) {
      next(error);
    }
  }
  static async createTire(req: Request, res: Response, next: NextFunction) {
    try {
      const { reference, brand, diameter } = req.body;
      const tire = new Tire({ reference, brand, diameter });
      await tire.save();
      return res.success({ tire }, "Tire créée avec succès", 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateTire(req: Request, res: Response, next: NextFunction) {
    try {
      
    } catch (error) {
      next(error);
    }
  }
  static async deleteTire(req: Request, res: Response, next: NextFunction) {}
}
export default TireController;
