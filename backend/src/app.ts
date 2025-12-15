import cors from "cors";
import "dotenv";
import express from "express";
import morgan from "morgan";
import errorMiddleware from "./app/Http/Middlewares/Error.middleware";
import { responseHandler } from "./app/Http/Middlewares/responseHandler";
import "./config/dbconfig";

import authRoutes from "./routes/auth.routes";
import DriverRoutes from "./routes/Driver.routes";
import LineRoutes from "./routes/Line.routes";
import MaintenanceRoutes from "./routes/Maintenance.routes";
import TireRoutes from "./routes/Tire.routes";
import TrackingRoutes from "./routes/Tracking.routes";
import TrailerRoutes from "./routes/Trailer.routes";
import TruckRoutes from "./routes/Truck.routes";

const app = express();
app.use(responseHandler);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Configuration CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/tire", TireRoutes);
app.use("/api/line", LineRoutes);
app.use("/api/truck", TruckRoutes);
app.use("/api/trailer", TrailerRoutes);
app.use("/api/driver", DriverRoutes);
app.use("/api/tracking", TrackingRoutes);
app.use("/api/maintenance", MaintenanceRoutes);

app.use(errorMiddleware);
export default app;
