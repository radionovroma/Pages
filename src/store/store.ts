import { configureStore } from "@reduxjs/toolkit";
import { reducer as categoriesReducer } from "./categories";
import { reducer as bannerProductsReducer } from "./banerProducts";
import { reducer as popularCategoriesReducer } from "./popularCategories";
import { reducer as catalogReducer } from "./catalog";
import { reducer as userReducer } from "./user";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    bannerProducts: bannerProductsReducer,
    popularCategories: popularCategoriesReducer,
    catalog: catalogReducer,
    user: userReducer,
  }
});

export type RootStore = ReturnType<typeof store.getState>;
