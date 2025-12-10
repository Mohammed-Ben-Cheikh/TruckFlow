import type { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  return res.error("Une erreur inattendue s'est produite", 500, err);
};
