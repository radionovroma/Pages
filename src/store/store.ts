import { configureStore } from "@reduxjs/toolkit";
import { reducer as categoriesReducer } from "./categories";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  }
});

export type RootStore = ReturnType<typeof store.getState>;
