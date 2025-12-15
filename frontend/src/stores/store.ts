import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/auth.service";
import { driverApi } from "../services/driver.service";
import { lineApi } from "../services/line.service";
import { maintenanceApi } from "../services/maintenance.service";
import { tireApi } from "../services/tire.service";
import { trackingApi } from "../services/tracking.service";
import { trailerApi } from "../services/trailer.service";
import { truckApi } from "../services/truck.service";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [lineApi.reducerPath]: lineApi.reducer,
    [maintenanceApi.reducerPath]: maintenanceApi.reducer,
    [driverApi.reducerPath]: driverApi.reducer,
    [truckApi.reducerPath]: truckApi.reducer,
    [tireApi.reducerPath]: tireApi.reducer,
    [trailerApi.reducerPath]: trailerApi.reducer,
    [trackingApi.reducerPath]: trackingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      lineApi.middleware,
      maintenanceApi.middleware,
      driverApi.middleware,
      truckApi.middleware,
      tireApi.middleware,
      trailerApi.middleware,
      trackingApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
