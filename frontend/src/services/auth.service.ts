import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: Credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData: UserData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    validate: builder.mutation({
      query: (tokenData: TokenData) => ({
        url: "auth/validate",
        method: "POST",
        body: tokenData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useValidateMutation } =
  authApi;
