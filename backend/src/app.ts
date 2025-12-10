import "dotenv";
import express from "express";
import morgan from "morgan";
import errorMiddleware from "./app/Http/Middlewares/Error.middleware";
import { responseHandler } from "./app/Http/Middlewares/responseHandler";
import "./config/dbconfig";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(responseHandler);
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);
export default app;
