import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "@api";
import { Book, LOAD_STATUSES, SearchParams } from "@types";

export interface State {
  searchList: Book[];
  total: number;
  loadStatus: LOAD_STATUSES;
}

const SLICE_NAME = "SEARCH";
const api = new Api();

const search = createAsyncThunk(SLICE_NAME,
  (text: SearchParams["text"]) => {
    return api.getProducts({text});
  });

const initialState: State = {
  searchList: [],
  total: 0,
  loadStatus: LOAD_STATUSES.UNKNOWN,
}

const { reducer, actions: sliceActions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    reset: (state) => {
      state.searchList = [];
      state.total = 0;
      state.loadStatus = LOAD_STATUSES.UNKNOWN;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(search.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });

    builder.addCase(search.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
    });

    builder.addCase(search.fulfilled, (state, action) => {
      state.searchList = action.payload.items;
      state.total = action.payload.total;
      state.loadStatus = LOAD_STATUSES.LOADED;
    })
  }
})

export { reducer };
export const actions = { ...sliceActions, search };
