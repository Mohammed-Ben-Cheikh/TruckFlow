import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./baseQueryWithToast";

interface Driver {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

export const driverApi = createApi({
  reducerPath: "driverApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getDrivers: builder.query<Driver[], void>({
      query: () => "driver",
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.drivers)) return data.drivers;
        const arr = Object.values(data || {}).find((v: any) =>
          Array.isArray(v)
        );
        return arr ?? data;
      },
    }),
    getDriver: builder.query<Driver, string>({
      query: (id) => `driver/${id}`,
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (data && data.driver) return data.driver;
        return data;
      },
    }),
    getDriverLines: builder.query<unknown, string>({
      query: (id) => `driver/${id}/lines`,
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.lines)) return data.lines;
        const arr = Object.values(data || {}).find((v: any) =>
          Array.isArray(v)
        );
        return arr ?? data;
      },
    }),
    createDriver: builder.mutation<Driver, Partial<Driver>>({
      query: (newDriver) => ({
        url: "driver",
        method: "POST",
        body: newDriver,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    updateDriver: builder.mutation<
      Driver,
      { id: string; data: Partial<Driver> }
    >({
      query: ({ id, data }) => ({
        url: `driver/${id}`,
        transformResponse: (response: any) => response?.data ?? response,
        method: "PUT",
        body: data,
      }),
    }),
    deleteDriver: builder.mutation<void, string>({
      query: (id) => ({
        transformResponse: (response: any) => response?.data ?? response,
        url: `driver/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetDriversQuery, useGetDriverQuery, useGetDriverLinesQuery } =
  driverApi;

export const {
  useCreateDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = driverApi;
