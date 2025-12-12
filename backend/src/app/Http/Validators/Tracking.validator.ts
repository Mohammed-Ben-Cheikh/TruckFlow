import { body } from "express-validator";

const statusEnum = ["a_faire", "en_cours", "termine"];

export const updateStatusValidator = [
  body("status")
    .exists()
    .withMessage("Le statut est requis")
    .isIn(statusEnum)
    .withMessage(`Le statut doit être parmi: ${statusEnum.join(", ")}`),
];

export const updateProgressValidator = [
  body("kilometrageDepart").optional().isNumeric(),
  body("kilometrageArrive").optional().isNumeric(),
  body("fuelLiters").optional().isNumeric(),
  body("driverNotes").optional().isString().trim(),
];

