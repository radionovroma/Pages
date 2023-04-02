import type { RootStore } from "../store";
import type { State } from "./slice";

const getBannerBooksSlice = (store: RootStore): State => store.bannerProducts;
export const getBannerBooksList = (store: RootStore): State["booksList"] =>
  getBannerBooksSlice(store).booksList;

export const getBannerBooksStatus = (store: RootStore): State["loadStatus"] =>
  getBannerBooksSlice(store).loadStatus;
