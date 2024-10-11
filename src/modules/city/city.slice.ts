import { createSlice } from "@reduxjs/toolkit";
import { CITY_PAYLOAD, cityPayload } from "./city.payload";

// Define a type for pagination parameters, similar to COUNTRY_PAGINATE_PARAMS
export interface CITY_PAGINATE_PARAMS extends Pick<CITY_PAYLOAD, 'pagingParams'> {}

// Define a type for the city slice
export interface CITY_SLICE {
  data: {
    cities: Array<any>;
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: null | string;
      nextPage: number;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
  };
  city: null | any;
  pagingParams: CITY_PAGINATE_PARAMS;
}

// Create the city slice
const citySlice = createSlice({
  name: 'city',  // Changed from 'admin' to 'city' for better clarity
  initialState: {
    data: {
      cities: [],
      paging: {
        totalCount: 0,
        totalPages: 0,
        previousPage: null,
        nextPage: 0,
        firstRowOnPage: 0,
        lastRowOnPage: 0,
      },
    },
    city: null, // Corrected from 'country' to 'city'
    pagingParams: cityPayload.pagingParams, // Correctly referencing cityPayload for pagingParams
  },
  reducers: {
    index: (state, action) => {
      state.data = action.payload; // Update the data including cities and paging
      return state;
    },
    update: (state, action) => {
      state.city = action.payload; // Update the current city
      return state;
    },
    show: (state, action) => {
      state.city = action.payload; // Set the current city for showing details
      return state;
    },
    setPaginate: (state, action) => {
      state.pagingParams = action.payload; // Corrected from paginateParams to pagingParams
      return state;
    },
  },
});

// Export actions
export const { index, update, show, setPaginate } = citySlice.actions;

// Export the reducer to be included in the store
export default citySlice.reducer;
