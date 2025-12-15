import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./baseQueryWithToast";

interface Maintenance {
  slug?: string;
  vehicle: string;
  type: string;
  description?: string;
  cost?: number;
  date?: string;
  createdBy?: string;
}

export const maintenanceApi = createApi({
  reducerPath: "maintenanceApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getMaintenances: builder.query<Maintenance[], void>({
      query: () => "maintenance",
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.maintenances)) return data.maintenances;
        const arr = Object.values(data || {}).find((v: any) =>
          Array.isArray(v)
        );
        return arr ?? data;
      },
    }),
    getMaintenance: builder.query<Maintenance, string>({
      query: (id) => `maintenance/${id}`,
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (data && data.maintenance) return data.maintenance;
        return data;
      },
    }),
    createMaintenance: builder.mutation<Maintenance, Partial<Maintenance>>({
      query: (newMaintenance) => ({
        url: "maintenance",
        method: "POST",
        body: newMaintenance,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    updateMaintenance: builder.mutation<
      Maintenance,
      { slug: string; data: Partial<Maintenance> }
    >({
      query: ({ slug, data }) => ({
        url: `maintenance/${slug}`,
        transformResponse: (response: any) => response?.data ?? response,
        method: "PUT",
        body: data,
      }),
    }),
    deleteMaintenance: builder.mutation<void, string>({
      query: (slug) => ({
        transformResponse: (response: any) => response?.data ?? response,
        url: `maintenance/${slug}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMaintenancesQuery,
  useGetMaintenanceQuery,
  useCreateMaintenanceMutation,
  useUpdateMaintenanceMutation,
  useDeleteMaintenanceMutation,
} = maintenanceApi;
