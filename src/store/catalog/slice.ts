import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "@api";
import { Book, FilterParams, LOAD_STATUSES, SearchParams } from "@types";

export interface State {
  products: Book[] | null;
  filterParams: FilterParams;
  total: number;
  loadStatus: LOAD_STATUSES;
}

const SLICE_NAME = "CATALOG";
const api = new Api();

export const fetchCatalog = createAsyncThunk(SLICE_NAME,
  (params?: SearchParams) => {
    return api.getProducts(params);
  });

const initialState: State = {
  products: null,
  filterParams: {
    minPrice: 0,
    maxPrice: 50,
    minYear: 1990,
    maxYear: 2023,
  },
  total: 0,
  loadStatus: LOAD_STATUSES.UNKNOWN,
}

export const { reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCatalog.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });

    builder.addCase(fetchCatalog.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
    });

    builder.addCase(fetchCatalog.fulfilled, (state, action) => {
      state.products = action.payload.items;
      state.filterParams = action.payload.filterParams;
      state.total = action.payload.total;
      state.loadStatus = LOAD_STATUSES.LOADED;
    })
  }
})
