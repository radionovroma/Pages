import { configureStore } from "@reduxjs/toolkit";
import { reducer as categoriesReducer } from "./categories";
import { reducer as bannerProductsReducer } from "./banerProducts";
import { reducer as popularCategoriesReducer } from "./popularCategories";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    bannerProducts: bannerProductsReducer,
    popularCategories: popularCategoriesReducer,
  }
});

export type RootStore = ReturnType<typeof store.getState>;
