import type { RootStore } from "../store";
import type { State } from "./slice";

const getUser = (store: RootStore): State => store.user;

export const getUserName = (store: RootStore): State["name"] =>
  getUser(store).name;

export const getUserLogin = (store: RootStore): State["login"] =>
  getUser(store).login;

export const getUserToken = (store: RootStore): State["token"] =>
  getUser(store).token;

export const getUserAuthFlag = (store: RootStore): State["isAuth"] =>
  getUser(store).isAuth;
