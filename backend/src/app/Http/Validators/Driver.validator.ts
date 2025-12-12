import { param } from "express-validator";

export const driverIdParamValidator = [
  param("id").isMongoId().withMessage("Identifiant chauffeur invalide"),
];

