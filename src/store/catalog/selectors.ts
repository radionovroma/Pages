import  type { RootStore } from "@store/store";
import type { State } from "./slice";

const getCatalogSlice = (store: RootStore): State => store.catalog;

export const getCatalogList = (store: RootStore): State["products"] =>
  getCatalogSlice(store).products;

export const getCatalogFilterParams = (store: RootStore): State["filterParams"] =>
  getCatalogSlice(store).filterParams;

export const getCatalogTotalCount = (store: RootStore): State["total"] =>
  getCatalogSlice(store).total;

export const getCatalogLoadStatus = (store: RootStore): State["loadStatus"] =>
  getCatalogSlice(store).loadStatus;
