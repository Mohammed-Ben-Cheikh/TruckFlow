import { body } from "express-validator";

const vehicleTypes = ["truck", "trailer"];
const maintenanceTypes = [
  "oil_change",
  "revision",
  "tires_change",
  "general_check",
  "repair",
];
const maintenanceStatus = ["planned", "in_progress", "done", "canceled"];

export const createMaintenanceValidator = [
  body("vehicleType")
    .exists()
    .withMessage("Le type de véhicule est requis")
    .isIn(vehicleTypes)
    .withMessage(`Le type doit être parmi: ${vehicleTypes.join(", ")}`),
  body("vehicle")
    .exists()
    .withMessage("L'identifiant du véhicule est requis")
    .isMongoId(),
  body("type")
    .exists()
    .withMessage("Le type de maintenance est requis")
    .isIn(maintenanceTypes)
    .withMessage(`Le type doit être parmi: ${maintenanceTypes.join(", ")}`),
  body("description").optional().isString().trim(),
  body("plannedAtKm").optional().isNumeric(),
  body("nextDueKm").optional().isNumeric(),
  body("dateStart").optional().isISO8601().toDate(),
  body("dateEnd").optional().isISO8601().toDate(),
  body("cost").optional().isNumeric(),
  body("parts")
    .optional()
    .isArray()
    .withMessage("Les pièces doivent être un tableau"),
  body("parts.*.name").optional().isString().trim(),
  body("parts.*.price").optional().isNumeric(),
  body("parts.*.qty").optional().isNumeric(),
  body("notes").optional().isString().trim(),
];

export const updateMaintenanceValidator = [
  body("vehicleType").optional().isIn(vehicleTypes),
  body("vehicle").optional().isMongoId(),
  body("type").optional().isIn(maintenanceTypes),
  body("description").optional().isString().trim(),
  body("plannedAtKm").optional().isNumeric(),
  body("nextDueKm").optional().isNumeric(),
  body("dateStart").optional().isISO8601().toDate(),
  body("dateEnd").optional().isISO8601().toDate(),
  body("cost").optional().isNumeric(),
  body("parts")
    .optional()
    .isArray()
    .withMessage("Les pièces doivent être un tableau"),
  body("parts.*.name").optional().isString().trim(),
  body("parts.*.price").optional().isNumeric(),
  body("parts.*.qty").optional().isNumeric(),
  body("notes").optional().isString().trim(),
  body("status").optional().isIn(maintenanceStatus),
];

