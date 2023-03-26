import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  name: string;
  login: string;
  token: string;
  isAuth: boolean;
}

const SLICE_NAME = "USER";

const initialState: State = {
  name: "",
  login: "",
  token: "",
  isAuth: false,
};

export const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ name: string, login: string, token: string }>) => {
      const { name, login, token } = action.payload
      state.name = name;
      state.login = login;
      state.token = token;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify({name, login, token}))
    },
    signOut: (state) => {
      state.name = "";
      state.login = "";
      state.token = "";
      state.isAuth = false;
      localStorage.removeItem("user");
    }
  },
});
