import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  name: string;
  login: string;
  token: string;
  isAuth: boolean;
}

const SLICE_NAME = "USER";

const writeUserToLocalStorage = createAsyncThunk(SLICE_NAME,
  (user: {name: string, login: string, token: string}) => {
    localStorage.setItem("user", JSON.stringify(user))
  });

const removeUserFromLocalStorage = createAsyncThunk(SLICE_NAME, () => {
  localStorage.removeItem("user");
})


const initialState: State = {
  name: "",
  login: "",
  token: "",
  isAuth: false,
};

const { reducer, actions: sliceActions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ name: string, login: string, token: string }>) => {
      const { name, login, token } = action.payload
      state.name = name;
      state.login = login;
      state.token = token;
      state.isAuth = true;
    },
    signOut: (state) => {
      state.name = "";
      state.login = "";
      state.token = "";
      state.isAuth = false;
    }
  },
});

export { reducer };
export const actions = { ...sliceActions, writeUserToLocalStorage, removeUserFromLocalStorage };
