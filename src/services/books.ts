import { createApi } from "@reduxjs/toolkit/query/react";
import { api } from "../api/Api";

type GetBookProps = {
  data: [
    {
      book: {
        id: number;
        isbn: string;
        title: string;
        cover: string;
        author: string;
        published: number;
        pages: number;
      };
      status: number;
    }
  ];
  isOk: boolean;
  message: string;
};

export const bookshelfApi = createApi({
  reducerPath: "bookshelfApi",
  baseQuery: api,
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query<
      GetBookProps,
      { Key: string | undefined; Sign: string | undefined }
    >({
      query: (body) => ({
        url: "books",
        method: "GET",
        headers: {
          Key: body.Key,
          Sign: body.Sign,
        },
      }),
      providesTags: ["Book"],
    }),
    createBook: builder.mutation<
      { isbn: string },
      {
        isbn: string;
        Key: string | undefined;
        Sign: string | undefined;
      }
    >({
      query: ({ isbn, Key, Sign }) => ({
        url: "books",
        method: "POST",
        body: { isbn },
        headers: { Key, Sign },
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<
      { status: number | null },
      {
        status: number | null;
        Key: string | undefined;
        Sign: string | undefined;
        id: number;
      }
    >({
      query: ({ status, Key, Sign, id }) => ({
        url: `books/${id}`,
        method: "PATCH",
        body: { status },
        headers: { Key, Sign },
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<
      { id: number | null },
      {
        Key: string | undefined;
        Sign: string | undefined;
        id: number;
      }
    >({
      query: ({ Key, Sign, id }) => ({
        url: `books/${id}`,
        method: "DELETE",
        body: "",
        headers: { Key, Sign },
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookshelfApi;
