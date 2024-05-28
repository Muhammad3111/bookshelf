import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://no23.lavina.tech";

export const api = fetchBaseQuery({
  baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
