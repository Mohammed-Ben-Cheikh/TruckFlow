import { NextFunction, Request, Response } from "express";

class TireController {
  static async getTires(req: Request, res: Response, next: NextFunction) {}
  static async getTire(req: Request, res: Response, next: NextFunction) {}
  static async createTire(req: Request, res: Response, next: NextFunction) {}
  static async updateTire(req: Request, res: Response, next: NextFunction) {}
  static async deleteTire(req: Request, res: Response, next: NextFunction) {}
}
export default TireController;
