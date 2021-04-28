import userService from "services/userService";
import ACTION_TYPES from "./actionTypes";

const { USERS_LOAD, USERS_LOAD_SUCCEED, USERS_LOAD_FAILED } = ACTION_TYPES;

export const loadStarted = () => ({
  type: USERS_LOAD,
});

export const loadSucceeded = (data) => ({
  type: USERS_LOAD_SUCCEED,
  payload: data,
});

export const loadFailed = (error) => ({
  type: USERS_LOAD_FAILED,
  payload: error,
});

export const load = () => async (dispatch) => {
  dispatch(loadStarted());
  return userService
    .getAll()
    .then((data) => dispatch(loadSucceeded(data)))
    .catch((error) => dispatch(loadFailed(error.message)));
};
