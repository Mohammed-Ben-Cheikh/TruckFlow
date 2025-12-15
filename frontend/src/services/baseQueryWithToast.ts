import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { notify } from "../utils/toast";

const rawBase = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/",
  prepareHeaders: (headers) => {
    try {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
    } catch (e) {
      // ignore
    }
    return headers;
  },
});

export const baseQueryWithToast = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await rawBase(args, api, extraOptions);

  try {
    if (result.error) {
      const errData = (result.error as any).data;
      const message =
        errData?.message ||
        (result.error as any).error ||
        JSON.stringify(result.error);
      notify(message, "error");
    } else if (result.data) {
      const data = result.data as any;
      const message = data?.message || data?.error;
      if (message) {
        const type = data?.success === false ? "error" : "success";
        notify(message, type as any);
      }
    }
  } catch (e) {
  }

  return result;
};

export default baseQueryWithToast;
