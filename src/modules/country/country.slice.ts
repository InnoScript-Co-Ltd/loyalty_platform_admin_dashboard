import { createSlice } from "@reduxjs/toolkit";
import { COUNTRY_PAYLOAD, countryPayload } from "./country.payload";

export interface COUNTRY_PAGINATE_PARAMS
  extends Pick<COUNTRY_PAYLOAD, "pagingParams"> {}

export interface COUNTRY_SLICE {
  data: {
    countries: Array<any>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  country: null | any;
  pagingParams: COUNTRY_PAGINATE_PARAMS;
}

const countrySlice = createSlice({
  name: "admin",
  initialState: {
    data: {
        countries: [],
        paging: {
          totalCount: 0,
          totalPages: 0,
          previousPage: null,
          nextPage: 0,
          firstRowOnPage: 0,
          lastRowOnPage: 0,
        }
      },
    country: null,
    pagingParams: countryPayload.pagingParams,
  },
  reducers: {
    index: (state, action) => {
      state.data = action.payload;
      return state;
    },
    update: (state, action) => {
      state.country = action.payload;
      return state;
    },
    show: (state, action) => {
      state.country = action.payload;
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload;
      return state;
    },
  },
});

export const { index, update, show, setPaginate } = countrySlice.actions;
export default countrySlice.reducer;
