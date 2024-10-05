import { createSlice } from "@reduxjs/toolkit";
import { COUNTRY_PAYLOAD, countryPayload } from "./country.payload";

export interface COUNTRY_PAGINATE_PARAMS extends Pick<COUNTRY_PAYLOAD, 'paginateParams'> {}

export interface COUNTRY_SLICE {
    countries: Array<any>,
    country: null | any,
    paginateParams: COUNTRY_PAGINATE_PARAMS
}



const countrySlice = createSlice({
    name: 'admin',
    initialState: {
        countries: [],
        country: null,
        paginateParams: countryPayload.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.countries = action.payload;
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
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = countrySlice.actions;
export default countrySlice.reducer;