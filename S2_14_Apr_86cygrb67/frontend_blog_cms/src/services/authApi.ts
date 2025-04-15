import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor";
}

interface LoginRegisterResponse {
  token: string;
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginRegisterResponse,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation<
      LoginRegisterResponse,
      { name: string; email: string; password: string }
    >({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    getUserProfile: builder.query<User, void>({
      query: () => "/users/profile",
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserProfileQuery } =
  authApi;
