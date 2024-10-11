import { Dispatch } from 'redux';
import { endpoints } from "../../constants/endpoints"; // Ensure this is the correct path to your endpoints
import { getRequest, postRequest, putRequest } from "../../helpers/api"; // Your API helpers
import { httpServiceHandler } from "../../helpers/handler"; // Your HTTP service handler
import { updateNotification } from "../../shares/shareSlice"; // Notification actions
import { CITY_PAYLOAD } from "./city.payload"; // Ensure this points to your actual city payload
import { index, show, update } from "./city.slice"; // Ensure this points to your actual city slice

// Creating an interface that only includes the `create` part of `CITY_PAYLOAD`
export interface CITY_STORE extends Pick<CITY_PAYLOAD, 'create'> {}
export interface CITY_UPDATE extends Pick<CITY_PAYLOAD, 'update'> {}

export const cityService = {
    // Method to create a new city
    store: async (payload: CITY_STORE['create'], dispatch: Dispatch) => {
        const response: any = await postRequest(endpoints.city, payload); // Change endpoint to city
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message,
            }));
        }
        return response;
    },

    // Method to fetch the list of cities
    index: async (dispatch: Dispatch, params: any, fn : any) => {
        const response: any = await getRequest(endpoints.city, params); // Change endpoint to city
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {            
            dispatch(index(response.data ? response.data : response.data)); // Ensure you handle the response correctly
        }
        console.log(response.data);
        return response;
    },

    // Method to update a city
    update: async (dispatch: Dispatch, id: number, payload: CITY_UPDATE['update']) => {
        const response: any = await putRequest(`${endpoints.city}/${id}`, payload); // Change endpoint to city
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(update(response.data));
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message,
            }));
        }
        return response;
    },

    // Method to fetch a single city by ID
    show: async (dispatch: Dispatch, id: number) => {
        const response: any = await getRequest(`${endpoints.city}/${id}`, null); // Change endpoint to city
        await httpServiceHandler(dispatch, response);

        if (response.status === 200) {
            dispatch(show(response.data));
        }

        return response;
    },
};
