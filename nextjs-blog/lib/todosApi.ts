import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";



export const todosApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ page }) => `todos?_page=${page}&_limit=100`,
      providesTags: (result = [], error, arg) => {
        return result
          ? [...result.map((id: any) => ({ type: "Todos", id })), "Todos"]
          : ["Todos"];
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetTodosQuery,

  util: { getRunningQueriesThunk },
} = todosApi;

// export endpoints for use in SSR
export const { getTodos } = todosApi.endpoints;
