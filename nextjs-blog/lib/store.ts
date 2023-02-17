import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {todosApi } from "./todosApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (gDM) => gDM().concat(todosApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
