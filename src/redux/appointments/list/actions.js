import appointmentService from "services/appointmentService";

import ACTION_TYPES from "./actionTypes";

const {
  APPOINTMENTS_SET_FILTER_VALUE,
  APPOINTMENTS_DATA_LOADING_STARTED,
  APPOINTMENTS_DATA_LOADING_SUCCESS,
  APPOINTMENTS_DATA_LOADING_FAIL,
} = ACTION_TYPES;

const setFilterValue = (name, value) => ({
  type: APPOINTMENTS_SET_FILTER_VALUE,
  payload: { name, value },
});

const loadStarted = () => ({
  type: APPOINTMENTS_DATA_LOADING_STARTED,
});

const loadSuccess = (data) => ({
  type: APPOINTMENTS_DATA_LOADING_SUCCESS,
  payload: data,
});

const loadFail = (error) => ({
  type: APPOINTMENTS_DATA_LOADING_FAIL,
  payload: error,
});

const load = (filter) => async (dispatch) => {
  dispatch(loadStarted());
  return appointmentService
    .getAll(filter)
    .then((data) => dispatch(loadSuccess(data)))
    .catch((error) => dispatch(loadFail(error.message)));
};

const actions = { setFilterValue, load };

export default actions;
