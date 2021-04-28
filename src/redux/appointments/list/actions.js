import appointmentService from "services/appointmentService";

import ACTION_TYPES from "./actionTypes";

const {
  APPOINTMENTS_FILTER_SET_VALUE,
  APPOINTMENTS_DATA_LOAD,
  APPOINTMENTS_DATA_LOAD_SUCCEEDED,
  APPOINTMENTS_DATA_LOAD_FAILED,
} = ACTION_TYPES;

export const setFilterValue = (name, value) => ({
  type: APPOINTMENTS_FILTER_SET_VALUE,
  payload: { name, value },
});

export const loadStarted = () => ({
  type: APPOINTMENTS_DATA_LOAD,
});

export const loadSucceeded = (data) => ({
  type: APPOINTMENTS_DATA_LOAD_SUCCEEDED,
  payload: data,
});

export const loadFailed = (error) => ({
  type: APPOINTMENTS_DATA_LOAD_FAILED,
  payload: error,
});

export const load = (filter) => async (dispatch) => {
  dispatch(loadStarted());
  return appointmentService
    .getAll(filter)
    .then((data) => dispatch(loadSucceeded(data)))
    .catch((error) => dispatch(loadFailed(error.message)));
};
