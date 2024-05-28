import { createApi } from "@reduxjs/toolkit/query/react";
import { RegisterProps } from "../components/SingUp";
import { api } from "../api/Api";

type GetUserProps = {
  data: {
    email: string;
    id: string;
    name: string;
    key: string;
    secret: string;
  };
  isOk: boolean;
  message: true;
};

export const userApi = createApi({
  reducerPath: "UserApi",
  baseQuery: api,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<
      GetUserProps,
      { Key: string | undefined; Sign: string | undefined }
    >({
      query: (body) => ({
        url: "myself",
        method: "GET",
        headers: {
          Key: body.Key,
          Sign: body.Sign,
        },
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation<RegisterProps, object>({
      query: (body) => ({ url: "/signup", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, useCreateUserMutation } = userApi;
