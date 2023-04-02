import  type { RootStore } from "@store/store";
import type { State } from "./slice";

const getSearchSlice = (store: RootStore): State => store.search;

export const getSearchList = (store: RootStore): State["searchList"] =>
  getSearchSlice(store).searchList;

export const getSearchListCount = (store: RootStore): State["total"] =>
  getSearchSlice(store).total;

export const getSearchListStatus = (store: RootStore): State["loadStatus"] =>
  getSearchSlice(store).loadStatus;
