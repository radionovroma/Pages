import type { RootStore } from "../store";
import type { State } from "./slice";

const getCategoriesSlice = (store: RootStore): State => store.categories;
export const getCategoriesList = (store: RootStore): State["categoryList"] =>
  getCategoriesSlice(store).categoryList;

export const getCategoriesStatus = (store: RootStore): State["loadStatus"] =>
  getCategoriesSlice(store).loadStatus;
