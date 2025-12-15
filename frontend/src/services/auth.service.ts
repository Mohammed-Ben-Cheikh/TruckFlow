import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./baseQueryWithToast";

interface Credentials {
  email: string;
  password: string;
}

interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface TokenData {
  token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    login: builder.mutation<any, Credentials>({
      query: (credentials: Credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    register: builder.mutation<any, UserData>({
      query: (userData: UserData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
    validate: builder.mutation<any, TokenData>({
      query: (tokenData: TokenData) => ({
        url: "auth/validate",
        method: "POST",
        body: tokenData,
      }),
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useValidateMutation } =
  authApi;
