import  type { RootStore } from "@store/store";
import type { State } from "./slice";

const getSearch = (store: RootStore): State => store.search;

export const getSearchList = (store: RootStore): State["searchList"] =>
  getSearch(store).searchList;

export const getSearchListCount = (store: RootStore): State["total"] =>
  getSearch(store).total;

export const getSearchListStatus = (store: RootStore): State["loadStatus"] =>
  getSearch(store).loadStatus;
