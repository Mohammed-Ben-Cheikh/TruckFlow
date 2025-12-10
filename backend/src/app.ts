import "dotenv";
import express from "express";
import errorMiddleware from "./app/Http/Middlewares/Error.middleware";
import { responseHandler } from "./app/Http/Middlewares/responseHandler";
import { validatorHandler } from "./app/Http/Middlewares/validatorHandler";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(responseHandler);
app.use(validatorHandler);

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);
export default app;
