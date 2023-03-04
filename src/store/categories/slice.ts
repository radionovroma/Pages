import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "@api";
import { Category, LOAD_STATUSES } from "@types";

export interface State {
  categoryList: Category[];
  loadStatus: LOAD_STATUSES;
}

const SLICE_NAME = "categories";
const api = new Api()

export const fetchCategoriesList = createAsyncThunk(SLICE_NAME, api.getCategoriesList);

const initialState: State = {
  categoryList: [],
  loadStatus: LOAD_STATUSES.UNKNOWN,
}

export const { reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesList.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });

    builder.addCase(fetchCategoriesList.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
    });

    builder.addCase(fetchCategoriesList.fulfilled, (state, action) => {
      state.categoryList = action.payload;
      state.loadStatus = LOAD_STATUSES.LOADED;
    });
  }
});
