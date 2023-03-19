import  type { RootStore } from "@store/store";
import type { State } from "./slice";

const getCatalog = (store: RootStore): State => store.catalog;

export const getCatalogList = (store: RootStore): State["products"] =>
  getCatalog(store).products;

export const getCatalogFilterParams = (store: RootStore): State["filterParams"] =>
  getCatalog(store).filterParams;

export const getCatalogTotalCount = (store: RootStore): State["total"] =>
  getCatalog(store).total;

export const getCatalogLoadStatus = (store: RootStore): State["loadStatus"] =>
  getCatalog(store).loadStatus;
