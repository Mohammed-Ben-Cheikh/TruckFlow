import { NextFunction, Request, Response } from "express";

class TruckController {
  static async getTrucks(req: Request, res: Response, next: NextFunction) { }
  static async getTruck(req: Request, res: Response, next: NextFunction) { }
  static async createTruck(req: Request, res: Response, next: NextFunction) { }
  static async updateTruck(req: Request, res: Response, next: NextFunction) { }
  static async deleteTruck(req: Request, res: Response, next: NextFunction) { }
}
export default TruckController;