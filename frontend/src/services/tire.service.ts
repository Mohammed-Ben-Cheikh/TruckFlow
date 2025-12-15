import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./baseQueryWithToast";

interface Tire {
  slug?: string;
  reference: string;
  brand?: string;
  diameter?: number;
  kilometrageMax?: number;
  used?: boolean;
  kilometrageCurrent?: number;
  image?: string;
}

export const tireApi = createApi({
  reducerPath: "tireApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getTires: builder.query<Tire[], void>({
      query: () => "tire",
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.tires)) return data.tires;
        const arr = Object.values(data || {}).find((v: any) =>
          Array.isArray(v)
        );
        return arr ?? data;
      },
    }),
    getTire: builder.query<Tire, string>({
      query: (id) => `tire/${id}`,
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (data && data.tire) return data.tire;
        return data;
      },
    }),
    createTire: builder.mutation<Tire, Partial<Tire>>({
      query: (newTire) => ({
        url: "tire",
        method: "POST",
        body: newTire,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    updateTire: builder.mutation<Tire, { slug: string; data: Partial<Tire> }>({
      query: ({ slug, data }) => ({
        url: `tire/${slug}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    deleteTire: builder.mutation<void, string>({
      query: (slug) => ({
        url: `tire/${slug}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const {
  useGetTiresQuery,
  useGetTireQuery,
  useCreateTireMutation,
  useUpdateTireMutation,
  useDeleteTireMutation,
} = tireApi;
