import appointmentStatusService from "services/appointmentStatusService";
import ACTION_TYPES from "./actionTypes";

const {
  APPOINTMENT_STATUSES_LOAD,
  APPOINTMENT_STATUSES_LOAD_SUCCEEDED,
  APPOINTMENT_STATUSES_LOAD_FAILED,
} = ACTION_TYPES;

const loadStarted = () => ({
  type: APPOINTMENT_STATUSES_LOAD,
});

const loadSucceeded = (data) => ({
  type: APPOINTMENT_STATUSES_LOAD_SUCCEEDED,
  payload: data,
});

const loadFailed = (error) => ({
  type: APPOINTMENT_STATUSES_LOAD_FAILED,
  payload: error,
});

const load = () => (dispatch) => {
  dispatch(loadStarted());
  return appointmentStatusService
    .getAll()
    .then((data) => dispatch(loadSucceeded(data)))
    .catch((error) => dispatch(loadFailed(error)));
};

export default { load };
