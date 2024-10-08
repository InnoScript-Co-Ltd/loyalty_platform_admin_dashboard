import { configureStore } from '@reduxjs/toolkit'
import shareSlice, { SHARE_SLICE } from "./shares/shareSlice";
import countrySlice, { COUNTRY_SLICE } from "../src/modules/country/country.slice";
import citySlice, { CITY_SLICE } from './modules/city/city.slice';

interface RootState {
    share: SHARE_SLICE;
    country: COUNTRY_SLICE
    // other slices of state...
  }

export const stores = configureStore({
  reducer: {
    share: shareSlice,
    country: countrySlice,
    city:citySlice
  },
})

// Infer the RootState type from the store itself
export type AppRootState = ReturnType<typeof stores.getState>;

// Infer AppDispatch from the store
export type AppDispatch = typeof stores.dispatch;