import type { RootStore } from "../store";
import type { State } from "./slice";

const getUserSlice = (store: RootStore): State => store.user;

export const getUserName = (store: RootStore): State["name"] =>
  getUserSlice(store).name;

export const getUserToken = (store: RootStore): State["token"] =>
  getUserSlice(store).token;

export const getUserAuthFlag = (store: RootStore): State["isAuth"] =>
  getUserSlice(store).isAuth;
