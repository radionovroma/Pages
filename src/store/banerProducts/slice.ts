import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "@api"
import { Book, LOAD_STATUSES} from "@types";

export interface State {
  booksList: Book[];
  loadStatus: LOAD_STATUSES;
}

const SLICE_NAME = "BANNER_BOOKS";
const api = new Api();

export const fetchBannerProducts = createAsyncThunk(SLICE_NAME, api.getBannerProducts);

const initialState: State = {
  booksList: [],
  loadStatus: LOAD_STATUSES.UNKNOWN,
}

export const { reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBannerProducts.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });

    builder.addCase(fetchBannerProducts.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
    });

    builder.addCase(fetchBannerProducts.fulfilled, (state, action) => {
      state.booksList = action.payload;
      state.loadStatus = LOAD_STATUSES.LOADED;
    });
  }
})
