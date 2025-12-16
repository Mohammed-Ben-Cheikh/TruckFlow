import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./baseQueryWithToast";

interface Line {
  slug: string;
  truck?: string;
  trailer?: string;
  driver?: string;
  departLocation?: string;
  arriveLocation?: string;
  status?: string;
  createdAt?: string;
}

export const lineApi = createApi({
  reducerPath: "lineApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getLines: builder.query<Line[], void>({
      query: () => "line",
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
    getLine: builder.query<Line, string>({
      query: (slug) => `line/${slug}`,
      transformResponse: (response: any) => {
        const data = response?.data ?? response;
        if (data && data.line) return data.line;
        return data;
      },
    }),
    createLine: builder.mutation<Line, Partial<Line>>({
      query: (newLine) => ({
        url: "line",
        method: "POST",
        body: newLine,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    updateLine: builder.mutation<Line, { slug: string; data: Partial<Line> }>({
      query: ({ slug, data }) => ({
        url: `line/${slug}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    deleteLine: builder.mutation<void, string>({
      query: (slug) => ({
        url: `line/${slug}`,
        method: "DELETE",
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const {
  useGetLinesQuery,
  useGetLineQuery,
  useCreateLineMutation,
  useUpdateLineMutation,
  useDeleteLineMutation,
} = lineApi;
