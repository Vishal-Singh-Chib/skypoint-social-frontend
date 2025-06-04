import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Post } from "../../app/models/content";

export const RegisterAPI = createApi({
  reducerPath: "Register",
  tagTypes: ["Login"],
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    register: builder.mutation<Post, { email: string ,password :string ,username :string}>({
      query: (body) => ({
        url: "Register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Login"],
    }),
  }),
});

export const {useRegisterMutation} = RegisterAPI;
