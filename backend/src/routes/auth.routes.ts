import express from "express";
import AuthController from "../app/Http/Controllers/Auth/Auth.controller";
import { validatorHandler } from "../app/Http/Middlewares/validatorHandler";
import {
  emailValidateur,
  loginValidateur,
  registerValidateur,
  resetValidateur,
  tokenValidateur,
} from "../app/Http/Validators/Auth.validator";

const authRoutes = express.Router();

authRoutes.post(
  "/register",
  registerValidateur,
  validatorHandler,
  AuthController.register
);

authRoutes.post(
  "/login",
  loginValidateur,
  validatorHandler,
  AuthController.login
);

authRoutes.post(
  "/validate",
  tokenValidateur,
  validatorHandler,
  AuthController.validate
);

authRoutes.post(
  "/message/validate",
  emailValidateur,
  validatorHandler,
  AuthController.validateMessage
);

authRoutes.post(
  "/reset",
  resetValidateur,
  validatorHandler,
  AuthController.reset
);

authRoutes.post(
  "/message/reset",
  emailValidateur,
  validatorHandler,
  AuthController.resetMessage
);

authRoutes.get("/verify-jwt", AuthController.verifyJWT);

authRoutes.get("/employees", AuthController.getEmployees);

export default authRoutes;
