import express from "express";
import { responseHandler } from "./app/Http/Middlewares/responseHandler";
import { validatorHandler } from "./app/Http/Middlewares/validatorHandler";
const app = express();

app.use(express.json());
app.use(responseHandler);
app.use(validatorHandler);

app.get("/", (req, res) => {
  res.send("TruckFlow Backend is running!");
});
export default app;
