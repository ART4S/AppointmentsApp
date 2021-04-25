import appointmentService from "services/appointmentService";

import ACTION_TYPES from "./actionTypes";

const {
  APPOINTMENTS_FILTER_SET_VALUE,
  APPOINTMENTS_DATA_LOAD,
  APPOINTMENTS_DATA_LOAD_SUCCEEDED,
  APPOINTMENTS_DATA_LOAD_FAILED,
} = ACTION_TYPES;

const setFilterValue = (name, value) => ({
  type: APPOINTMENTS_FILTER_SET_VALUE,
  payload: { name, value },
});

const loadStarted = () => ({
  type: APPOINTMENTS_DATA_LOAD,
});

const loadSucceeded = (data) => ({
  type: APPOINTMENTS_DATA_LOAD_SUCCEEDED,
  payload: data,
});

const loadFailed = (error) => ({
  type: APPOINTMENTS_DATA_LOAD_FAILED,
  payload: error,
});

const load = (filter) => async (dispatch) => {
  dispatch(loadStarted());
  return appointmentService
    .getAll(filter)
    .then((data) => dispatch(loadSucceeded(data)))
    .catch((error) => dispatch(loadFailed(error.message)));
};

export default { setFilterValue, load };
