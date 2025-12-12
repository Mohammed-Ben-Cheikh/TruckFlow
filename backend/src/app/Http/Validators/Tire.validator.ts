import { body } from "express-validator";

export const createTireValidator = [
  body("reference")
    .exists()
    .withMessage("La référence est requise")
    .isString()
    .trim()
    .notEmpty(),
  body("brand").exists().withMessage("La marque est requise").isString().trim(),
  body("diameter").exists().withMessage("Le diamètre est requis").isNumeric(),
  body("kilometrageMax")
    .exists()
    .withMessage("Le kilométrage max est requis")
    .isNumeric(),
  body("used").optional().isBoolean(),
  body("kilometrageCurrent")
    .optional()
    .isNumeric()
    .withMessage("Kilométrage actuel invalide"),
];

export const updateTireValidator = [
  body("reference").optional().isString().trim().notEmpty(),
  body("brand").optional().isString().trim().notEmpty(),
  body("diameter").optional().isNumeric(),
  body("kilometrageMax").optional().isNumeric(),
  body("used").optional().isBoolean(),
  body("kilometrageCurrent")
    .optional()
    .isNumeric()
    .withMessage("Kilométrage actuel invalide"),
];

