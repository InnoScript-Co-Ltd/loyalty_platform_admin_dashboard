import { keys } from "../constants/config";
import { updateError, updateNotification } from "../shares/shareSlice";
import { removeData } from "./localStorage";
import { Dispatch } from 'redux';

/**
 * Payload handler for update state
 * @param {*} payload
 * @param {*} value
 * @param {*} field
 * @param {*} fn
 */
export const payloadHandler = (payload : any, value: string | number, field: string, fn: (updatedPayload: any) => void) => {
  let updatePayload = { ...payload };
  updatePayload[field] = value;
  fn(updatePayload);
};

/**
 * Http error handler for api call
 * @param {*} error
 * @returns
 */
export const httpErrorHandler = (error: any) => {
  if (error.code === "ERR_NETWORK") {
    return {
      message: error.message,
      status: 0,
      notification: {
        show: true,
        msg: "Network Error!",
        severity: "error",
      },
    };
  }

  const { status, data } = error.response;

  if (status === 400 || status === 404 || status === 500 || status === 403) {
    return {
      status: status,
      message: data.message,
      notification: {
        show: true,
        severity: "warning",
        summary: "Error Message",
      },
    };
  }

  if (status === 422) {
    return { status: status, error: data.data };
  }

  if (status === 401) {
    removeData(keys.API_TOKEN);
    window.location.reload();
    return {
      status: status,
      error: data.message,
    };
  }
};

/**
 * Http response handler for api call
 * @param {*} result
 * @returns
 */
export const httpResponseHandler = (result : any) => {
  return {
    status: result.status,
    statusText: result.statusText,
    data: result.data,
  };
};

/**
 * Http status handler from service
 * @param {*} dispatch
 * @param {*} result
 * @returns
 */
export const httpServiceHandler = async (
    dispatch: Dispatch, 
    result: { status: number, notification?: string, error?: string }
) => {
  await dispatch(updateError(null));
  if (
    result.status === 400 ||
    result.status === 0 ||
    result.status === 500 ||
    result.status === 404 ||
    result.status === 403
  ) {
    await dispatch(updateNotification(result.notification));
  }

  if (result.status === 422) {
    await dispatch(updateError(result.error));
  }

  return;
};
