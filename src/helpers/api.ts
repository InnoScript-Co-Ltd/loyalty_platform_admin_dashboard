import http from "../constants/axios"
import { httpErrorHandler, httpResponseHandler } from "./handler"

const urlParams = (params: string) => {
    let paramsArray: Array<string> = [];
    Object.keys(params).map((value : any) => {
        return paramsArray.push(`${value}=${params[value]}`);
    });
    return paramsArray.join("&");
}

/**
 * Http get method request
 * @param {*} path 
 * @param {*} params 
 * @returns 
 */
export const getRequest = async (path: string, params : any | null) => {
    try {
        const url = params ? `${path}?${urlParams(params)}` : path;
        const result = await http.get(url);
        return httpResponseHandler(result);
    } catch (error) {
        return httpErrorHandler(error);
    }
}

/**
 * Http post method request 
 * @param {*} path 
 * @param {*} payload 
 * @returns 
 */
export const postRequest = async (path: string, payload: any) => {
    try {
        const result = await http.post(path, payload);
        return httpResponseHandler(result);
    } catch (error) {
        return httpErrorHandler(error);
    }
}

/**
 * Http put method request
 * @param {*} path 
 * @param {*} payload 
 * @returns 
 */
export const putRequest = async (path: string, payload: any) => {
    try {
        const result = await http.put(path, payload);
        return httpResponseHandler(result);
    } catch (error) {
        return httpErrorHandler(error);
    }
}

/**
 * Http delete method request
 * @param {*} path 
 * @returns 
 */
export const delRequest = async (path: string) => {
    try {
        const result = await http.delete(path);
        return httpResponseHandler(result);
    } catch (error) {
        return httpErrorHandler(error);
    }  
}