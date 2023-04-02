import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "@api";
import { Book, Category, LOAD_STATUSES } from "@types";

export interface State {
  popularCategories: {
    category: Category;
    books: Book[];
  }[];
  loadStatus: LOAD_STATUSES;
}

const SLICE_NAME = "POPULAR_CATEGORIES";
const api = new Api();

export const fetchPopularCategories = createAsyncThunk(SLICE_NAME, api.getPopularCategories);

const initialState: State = {
  popularCategories: [],
  loadStatus: LOAD_STATUSES.UNKNOWN,
};

export const { reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPopularCategories.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });

    builder.addCase(fetchPopularCategories.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
    });

    builder.addCase(fetchPopularCategories.fulfilled, (state, action) => {
      state.popularCategories = action.payload;
      state.loadStatus = LOAD_STATUSES.LOADED;
    });
  }
});
