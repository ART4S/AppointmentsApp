import InitialState from "./initialState";

import converter from "utils/entitiesConverter";

import ACTION_TYPES from "./actionTypes";
import LOADING_STATUSES from "constants/loadingStatuses";

const {
  APPOINTMENTS_SET_FILTER_VALUE,
  APPOINTMENTS_DATA_LOADING_STARTED,
  APPOINTMENTS_DATA_LOADING_SUCCESS,
  APPOINTMENTS_DATA_LOADING_FAIL,
} = ACTION_TYPES;

const setFilterValue = (state, { name, value }) =>
  state.setIn(["dataSource", "filter", name], value);

const loadStarted = (state) =>
  state.setIn(["status"], LOADING_STATUSES.loading);

const loadSuccess = (state, data) =>
  state.setIn(["status"], LOADING_STATUSES.success).setIn(
    ["dataSource", "entities"],
    converter.arrayToEntities(data, (x) => x.id)
  );

const loadFail = (state, error) =>
  state.setIn(["status"], LOADING_STATUSES.fail).setIn(["error"], error);

const initialState = new InitialState();

function reducer(state = initialState, action) {
  if (!(state instanceof InitialState)) {
    return initialState;
  }

  switch (action.type) {
    case APPOINTMENTS_SET_FILTER_VALUE:
      return setFilterValue(state, action.payload);
    case APPOINTMENTS_DATA_LOADING_STARTED:
      return loadStarted(state);
    case APPOINTMENTS_DATA_LOADING_SUCCESS:
      return loadSuccess(state, action.payload);
    case APPOINTMENTS_DATA_LOADING_FAIL:
      return loadFail(state, action.payload);
    default:
      return state;
  }
}

export default reducer;
