/** @format */

import { GET_COORDINATORS_SUCCESS, GET_COORDINATORS_FAIL } from "../actions/types";

export const create = (data) => (dispatch) => {
  return service.create(data).then(
    (responseData) => {
      dispatch({
        type: SAVE_DOCTOR_SUCCESS,
      });

      return Promise.resolve(responseData);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: SAVE_DOCTOR_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export default function (state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COORDINATORS_SUCCESS:
      return {
        ...state,
        coordinators: payload.coordinators,
      };
    case GET_COORDINATORS_FAIL:
      return {
        ...state,
        coordinators: null,
      };
    default:
      return state;
  }
}
