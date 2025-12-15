import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./baseQueryWithToast";

interface Trailer {
  slug?: string;
  registration: string;
  brand?: string;
  model?: string;
  status?: string;
  kilometrage?: number;
  image?: string;
}

export const trailerApi = createApi({
  reducerPath: "trailerApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getTrailers: builder.query<Trailer[], void>({
      query: () => "trailer",
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.trailers)) return data.trailers;
        const arr = Object.values(data || {}).find((v: any) =>
          Array.isArray(v)
        );
        return arr ?? data;
      },
    }),
    getTrailer: builder.query<Trailer, string>({
      query: (id) => `trailer/${id}`,
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (data && data.trailer) return data.trailer;
        return data;
      },
    }),
    createTrailer: builder.mutation<Trailer, Partial<Trailer>>({
      query: (newTrailer) => ({
        url: "trailer",
        method: "POST",
        body: newTrailer,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    updateTrailer: builder.mutation<
      Trailer,
      { slug: string; data: Partial<Trailer> }
    >({
      query: ({ slug, data }) => ({
        url: `trailer/${slug}`,
        transformResponse: (response: any) => response?.data ?? response,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTrailer: builder.mutation<void, string>({
      query: (slug) => ({
        transformResponse: (response: any) => response?.data ?? response,
        url: `trailer/${slug}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTrailersQuery,
  useGetTrailerQuery,
  useCreateTrailerMutation,
  useUpdateTrailerMutation,
  useDeleteTrailerMutation,
} = trailerApi;
