import express from "express";
import AuthController from "../app/Http/Controllers/Auth.controller";
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
  AuthController.register
);

authRoutes.post(
  "/login",
  loginValidateur,
  AuthController.login
);

authRoutes.post(
  "/validate",
  tokenValidateur,
  AuthController.validate
);

authRoutes.post(
  "/message/validate",
  emailValidateur,
  AuthController.validateMessage
);

authRoutes.post(
  "/reset",
  resetValidateur,
  AuthController.reset
);

authRoutes.post(
  "/message/reset",
  emailValidateur,
  AuthController.resetMessage
);

export default authRoutes;
