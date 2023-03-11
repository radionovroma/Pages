import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "@api";
import { LOAD_STATUSES } from "@types";

export interface State {
  response: string | undefined;
  data: {
    email: string;
    id: string;
  } | null;
  loadStatus: LOAD_STATUSES;
}

const SLICE_NAME = "NEWSLETTER_SUBSCRIPTION";
const api = new Api();

export const subscribe = createAsyncThunk(SLICE_NAME,
  (email: string) => { return api.subscribeNewsletter(email) }
);

const initialState: State = {
  response: "",
  data: null,
  loadStatus: LOAD_STATUSES.UNKNOWN,
}

export const { reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(subscribe.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });

    builder.addCase(subscribe.rejected, (state, action) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
      if (action.error.message === "Not Found") {
        state.response = "You are already subscribed"
      } else {
        state.response = action.error.message;
      }
    });

    builder.addCase(subscribe.fulfilled, (state, action) => {
      state.loadStatus = LOAD_STATUSES.LOADED;
      state.data = action.payload.subscribers;
    });
  }
})
