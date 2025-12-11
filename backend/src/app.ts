import "dotenv";
import express from "express";
import morgan from "morgan";
import errorMiddleware from "./app/Http/Middlewares/Error.middleware";
import { responseHandler } from "./app/Http/Middlewares/responseHandler";
import "./config/dbconfig";

import authRoutes from "./routes/auth.routes";
import LineRoutes from "./routes/Line.routes";
import TireRoutes from "./routes/Tire.routes";
import TrailerRoutes from "./routes/Trailer.routes";
import TruckRoutes from "./routes/Truck.routes";

const app = express();
app.use(responseHandler);
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use("/api/auth", authRoutes);
app.use("/api/tire", TireRoutes);
app.use("/api/line", LineRoutes);
app.use("/api/truck", TruckRoutes);
app.use("/api/trailer", TrailerRoutes);

app.use(errorMiddleware);
export default app;
