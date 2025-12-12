import { body } from "express-validator";

const statusEnum = ["a_faire", "en_cours", "termine"];

export const createLineValidator = [
  body("code")
    .exists()
    .withMessage("Le code est requis")
    .isString()
    .trim()
    .notEmpty(),
  body("truck").exists().withMessage("Le camion est requis").isMongoId(),
  body("driver").exists().withMessage("Le chauffeur est requis").isMongoId(),
  body("trailer").optional({ nullable: true }).isMongoId(),
  body("departLocation").optional().isString().trim(),
  body("arriveLocation").optional().isString().trim(),
  body("status")
    .optional()
    .isIn(statusEnum)
    .withMessage(`Le statut doit être parmi: ${statusEnum.join(", ")}`),
  body("kilometrageDepart").optional().isNumeric(),
  body("kilometrageArrive").optional().isNumeric(),
  body("fuelLiters").optional().isNumeric(),
  body("pdfUrl").optional().isString().trim(),
  body("driverNotes").optional().isString().trim(),
];

export const updateLineValidator = [
  body("code").optional().isString().trim().notEmpty(),
  body("truck").optional().isMongoId(),
  body("driver").optional().isMongoId(),
  body("trailer").optional({ nullable: true }).isMongoId(),
  body("departLocation").optional().isString().trim(),
  body("arriveLocation").optional().isString().trim(),
  body("status")
    .optional()
    .isIn(statusEnum)
    .withMessage(`Le statut doit être parmi: ${statusEnum.join(", ")}`),
  body("kilometrageDepart").optional().isNumeric(),
  body("kilometrageArrive").optional().isNumeric(),
  body("fuelLiters").optional().isNumeric(),
  body("pdfUrl").optional().isString().trim(),
  body("driverNotes").optional().isString().trim(),
];

