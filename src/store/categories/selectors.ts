import type { RootStore } from "../store";
import type { State } from "./slice";

const getCategories = (store: RootStore): State => store.categories;
export const getCategoriesList = (store: RootStore): State["categoryList"] =>
  getCategories(store).categoryList;

export const getCategoriesStatus = (store: RootStore): State["loadStatus"] =>
  getCategories(store).loadStatus;
