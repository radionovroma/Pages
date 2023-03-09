import { configureStore } from "@reduxjs/toolkit";
import { reducer as categoriesReducer } from "./categories";
import { reducer as bannerProductsReducer } from "./banerProducts";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    bannerProducts: bannerProductsReducer,
  }
});

export type RootStore = ReturnType<typeof store.getState>;
