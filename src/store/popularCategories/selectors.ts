import type { RootStore } from "../store";
import type { State } from "./slice";

const getPopularCategoriesSlice = (store: RootStore): State => store.popularCategories;
export const getPopularCategoriesList = (store: RootStore): State["popularCategories"] =>
  getPopularCategoriesSlice(store).popularCategories;

export const getPopularCategoriesStatus = (store: RootStore): State["loadStatus"] =>
  getPopularCategoriesSlice(store).loadStatus;
