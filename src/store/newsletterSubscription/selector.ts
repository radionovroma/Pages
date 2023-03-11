import type { RootStore } from "@store/store";
import type { State } from "./slise";

const getSubscribe = (store: RootStore): State => store.newsletterReducer;

export const getSubscribeResponse = (store: RootStore): State["response"] =>
  getSubscribe(store).response;

export const getSubscribeData = (store: RootStore): State["data"] =>
  getSubscribe(store).data;

export const getSubscribeStatus = (store: RootStore): State["loadStatus"] =>
  getSubscribe(store).loadStatus;
