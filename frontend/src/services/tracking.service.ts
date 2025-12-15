import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./baseQueryWithToast";

interface Tracking {
  slug?: string;
  truck?: string;
  trailer?: string;
  location: string;
  timestamp?: string;
}

export const trackingApi = createApi({
  reducerPath: "trackingApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getTrackings: builder.query<Tracking[], void>({
      query: () => "tracking",
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.trackings)) return data.trackings;
        const arr = Object.values(data || {}).find((v: any) =>
          Array.isArray(v)
        );
        return arr ?? data;
      },
    }),
    getTracking: builder.query<Tracking, string>({
      query: (id) => `tracking/${id}`,
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (data && data.tracking) return data.tracking;
        return data;
      },
    }),
    createTracking: builder.mutation<Tracking, Partial<Tracking>>({
      query: (newTracking) => ({
        url: "tracking",
        method: "POST",
        body: newTracking,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    updateTracking: builder.mutation<
      Tracking,
      { slug: string; data: Partial<Tracking> }
    >({
      query: ({ slug, data }) => ({
        url: `tracking/${slug}`,
        transformResponse: (response: any) => response?.data ?? response,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTracking: builder.mutation<void, string>({
      query: (slug) => ({
        transformResponse: (response: any) => response?.data ?? response,
        url: `tracking/${slug}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTrackingsQuery,
  useGetTrackingQuery,
  useCreateTrackingMutation,
  useUpdateTrackingMutation,
  useDeleteTrackingMutation,
} = trackingApi;
