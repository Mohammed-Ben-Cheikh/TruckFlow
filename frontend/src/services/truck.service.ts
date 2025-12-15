import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./baseQueryWithToast";

interface Truck {
  slug?: string;
  registration: string;
  brand?: string;
  model?: string;
  status?: string;
  kilometrage?: number;
  lastOilChangeKm?: number;
  lastRevisionKm?: number;
  image?: string;
}

export const truckApi = createApi({
  reducerPath: "truckApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getTrucks: builder.query<Truck[], void>({
      query: () => "truck",
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.trucks)) return data.trucks;
        const arr = Object.values(data || {}).find((v: any) =>
          Array.isArray(v)
        );
        return arr ?? data;
      },
    }),
    getTruck: builder.query<Truck, string>({
      query: (id) => `truck/${id}`,
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (data && data.truck) return data.truck;
        return data;
      },
    }),
    createTruck: builder.mutation<Truck, Partial<Truck>>({
      query: (newTruck) => ({
        url: "truck",
        method: "POST",
        body: newTruck,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    updateTruck: builder.mutation<
      Truck,
      { slug: string; data: Partial<Truck> }
    >({
      query: ({ slug, data }) => ({
        url: `truck/${slug}`,
        transformResponse: (response: any) => response?.data ?? response,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTruck: builder.mutation<void, string>({
      query: (slug) => ({
        transformResponse: (response: any) => response?.data ?? response,
        url: `truck/${slug}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTrucksQuery,
  useGetTruckQuery,
  useCreateTruckMutation,
  useUpdateTruckMutation,
  useDeleteTruckMutation,
} = truckApi;
