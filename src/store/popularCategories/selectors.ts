import type { RootStore } from "../store";
import type { State } from "./slise";

const getPopularCategories = (store: RootStore): State => store.popularCategories;
export const getPopularCategoriesList = (store: RootStore): State["popularCategories"] =>
  getPopularCategories(store).popularCategories;

export const getPopularCategoriesStatus = (store: RootStore): State["loadStatus"] =>
  getPopularCategories(store).loadStatus;
