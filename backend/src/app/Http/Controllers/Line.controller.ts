import { NextFunction, Request, Response } from "express";

class LineController {
  static async getLines(req: Request, res: Response, next: NextFunction) {}
  static async getLine(req: Request, res: Response, next: NextFunction) {}
  static async createLine(req: Request, res: Response, next: NextFunction) {}
  static async updateLine(req: Request, res: Response, next: NextFunction) {}
  static async deleteLine(req: Request, res: Response, next: NextFunction) {}
}
export default LineController;