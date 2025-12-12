import { body } from "express-validator";

const statusEnum = ["available", "on_trip", "maintenance"];

export const createTruckValidator = [
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
  body("model")
    .exists()
    .withMessage("Le modèle est requis")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Le modèle ne peut pas être vide"),
  body("status")
    .optional()
    .isIn(statusEnum)
    .withMessage(`Le statut doit être parmi: ${statusEnum.join(", ")}`),
  body("kilometrage").optional().isNumeric().withMessage("Kilométrage invalide"),
  body("lastOilChangeKm")
    .optional()
    .isNumeric()
    .withMessage("Kilométrage dernière vidange invalide"),
  body("lastRevisionKm")
    .optional()
    .isNumeric()
    .withMessage("Kilométrage dernière révision invalide"),
];

export const updateTruckValidator = [
  body("registration").optional().isString().trim().notEmpty(),
  body("brand").optional().isString().trim().notEmpty(),
  body("model").optional().isString().trim().notEmpty(),
  body("status")
    .optional()
    .isIn(statusEnum)
    .withMessage(`Le statut doit être parmi: ${statusEnum.join(", ")}`),
  body("kilometrage").optional().isNumeric().withMessage("Kilométrage invalide"),
  body("lastOilChangeKm")
    .optional()
    .isNumeric()
    .withMessage("Kilométrage dernière vidange invalide"),
  body("lastRevisionKm")
    .optional()
    .isNumeric()
    .withMessage("Kilométrage dernière révision invalide"),
];

