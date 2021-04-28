import appointmentStatusService from "services/appointmentStatusService";
import ACTION_TYPES from "./actionTypes";

const {
  APPOINTMENT_STATUSES_LOAD,
  APPOINTMENT_STATUSES_LOAD_SUCCEEDED,
  APPOINTMENT_STATUSES_LOAD_FAILED,
} = ACTION_TYPES;

export const loadStarted = () => ({
  type: APPOINTMENT_STATUSES_LOAD,
});

export const loadSucceeded = (data) => ({
  type: APPOINTMENT_STATUSES_LOAD_SUCCEEDED,
  payload: data,
});

export const loadFailed = (error) => ({
  type: APPOINTMENT_STATUSES_LOAD_FAILED,
  payload: error,
});

export const load = () => (dispatch) => {
  dispatch(loadStarted());
  return appointmentStatusService
    .getAll()
    .then((data) => dispatch(loadSucceeded(data)))
    .catch((error) => dispatch(loadFailed(error)));
};
