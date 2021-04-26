import { Record } from "immutable";

import normalize from "utils/normalize";

import LOADING_STATUSES from "constants/loadingStatuses";
import ACTION_TYPES from "./actionTypes";

const InitialState = Record({
  status: LOADING_STATUSES.idle,
  error: null,

  dataSource: Record({
    entities: Record({})(),

    filter: Record({
      startDate: "",
      finishDate: "",
      clientName: "",
      onlyMe: false,
      statusId: "",
    })(),
  })(),
});

const {
  APPOINTMENTS_FILTER_SET_VALUE,
  APPOINTMENTS_DATA_LOAD,
  APPOINTMENTS_DATA_LOAD_SUCCEEDED,
  APPOINTMENTS_DATA_LOAD_FAILED,
} = ACTION_TYPES;

function reducer(state, action) {
  if (!(state instanceof InitialState)) {
    return new InitialState();
  }

  switch (action.type) {
    case APPOINTMENTS_FILTER_SET_VALUE: {
      const { name, value } = action.payload;
      return state.setIn(["dataSource", "filter", name], value);
    }

    case APPOINTMENTS_DATA_LOAD:
      return state.setIn(["status"], LOADING_STATUSES.loading);

    case APPOINTMENTS_DATA_LOAD_SUCCEEDED: {
      const data = action.payload;

      return state.setIn(["status"], LOADING_STATUSES.idle).setIn(
        ["dataSource", "entities"],
        normalize(data, (x) => x.id)
      );
    }

    case APPOINTMENTS_DATA_LOAD_FAILED: {
      const error = action.payload;

      return state
        .setIn(["status"], LOADING_STATUSES.fail)
        .setIn(["error"], error);
    }

    default:
      return state;
  }
}

export default reducer;
