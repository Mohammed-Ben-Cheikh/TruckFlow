import { body } from "express-validator";

const statusEnum = ["available", "on_trip", "maintenance"];

export const createTrailerValidator = [
  body("registration")
    .exists()
    .withMessage("La matricule est requise")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("La matricule ne peut pas être vide"),
  body("brand")
    .exists()
    .withMessage("La marque est requise")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("La marque ne peut pas être vide"),
  body("type")
    .exists()
    .withMessage("Le type est requis")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le type ne peut pas être vide"),
  body("status")
    .optional()
    .isIn(statusEnum)
    .withMessage(`Le statut doit être parmi: ${statusEnum.join(", ")}`),
  body("kilometrage").optional().isNumeric().withMessage("Kilométrage invalide"),
];

export const updateTrailerValidator = [
  body("registration").optional().isString().trim().notEmpty(),
  body("brand").optional().isString().trim().notEmpty(),
  body("type").optional().isString().trim().notEmpty(),
  body("status")
    .optional()
    .isIn(statusEnum)
    .withMessage(`Le statut doit être parmi: ${statusEnum.join(", ")}`),
  body("kilometrage").optional().isNumeric().withMessage("Kilométrage invalide"),
];

