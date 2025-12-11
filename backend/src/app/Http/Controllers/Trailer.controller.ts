import { NextFunction, Request, Response } from "express";

class TrailerController {
  static async getTrailers(req: Request, res: Response, next: NextFunction) { }
  static async getTrailer(req: Request, res: Response, next: NextFunction) { }
  static async createTrailer(req: Request, res: Response, next: NextFunction) { }
  static async updateTrailer(req: Request, res: Response, next: NextFunction) { }
  static async deleteTrailer(req: Request, res: Response, next: NextFunction) { }
}
export default TrailerController;