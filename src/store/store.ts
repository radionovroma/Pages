import { configureStore } from "@reduxjs/toolkit";
import { reducer as categoriesReducer } from "./categories";
import { reducer as bannerProductsReducer } from "./banerProducts";
import { reducer as popularCategoriesReducer } from "./popularCategories";
import { reducer as newsletterReducer } from "./newsletterSubscription";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    bannerProducts: bannerProductsReducer,
    popularCategories: popularCategoriesReducer,
    newsletterReducer: newsletterReducer,
  }
});

export type RootStore = ReturnType<typeof store.getState>;
