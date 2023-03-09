import type { RootStore } from "../store";
import type { State } from "./slice";

const getBannerBooks = (store: RootStore): State => store.bannerProducts;
export const getBannerBooksList = (store: RootStore): State["booksList"] =>
  getBannerBooks(store).booksList;

export const getBannerBooksStatus = (store: RootStore): State["loadStatus"] =>
  getBannerBooks(store).loadStatus;
