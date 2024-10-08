import { createSlice } from "@reduxjs/toolkit";
import { CITY_PAYLOAD, cityPayload } from "./city.payload";

// Define a type for pagination parameters, similar to COUNTRY_PAGINATE_PARAMS
export interface CITY_PAGINATE_PARAMS extends Pick<CITY_PAYLOAD, 'paginateParams'> {}

// Define a type for the city slice
export interface CITY_SLICE {
    cities: Array<any>;
    city: null | any;
    paginateParams: CITY_PAGINATE_PARAMS;
}

// Create the city slice
const citySlice = createSlice({
    name: 'admin',  // You can change this to 'city' if preferred
    initialState: {
        cities: [],
        city: null,
        paginateParams: cityPayload.paginateParams,
    },
    reducers: {
        index: (state, action) => {
            state.cities = action.payload; // Update cities list
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
            state.paginateParams = action.payload; // Update pagination parameters
            return state;
        },
    },
});

// Export actions
export const { index, update, show, setPaginate } = citySlice.actions;

// Export the reducer to be included in the store
export default citySlice.reducer;
