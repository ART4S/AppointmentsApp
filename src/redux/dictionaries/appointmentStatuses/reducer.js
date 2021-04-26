import { Record } from "immutable";

import ACTION_TYPES from "./actionTypes";
import LOADING_STATUSES from "constants/loadingStatuses";

import normalize from "utils/normalize";

const InitialState = Record({
  status: LOADING_STATUSES.idle,
  error: null,
  dataSource: Record({
    entities: Record({})(),
  })(),
});

const {
  APPOINTMENT_STATUSES_LOAD,
  APPOINTMENT_STATUSES_LOAD_SUCCEEDED,
  APPOINTMENT_STATUSES_LOAD_FAILED,
} = ACTION_TYPES;

export default function reducer(state, action) {
  if (!(state instanceof InitialState)) {
    return new InitialState();
  }

  switch (action.type) {
    case APPOINTMENT_STATUSES_LOAD:
      return state.setIn(["status"], LOADING_STATUSES.loading);

    case APPOINTMENT_STATUSES_LOAD_SUCCEEDED: {
      const data = action.payload;

      return state.setIn(["status"], LOADING_STATUSES.idle).setIn(
        ["dataSource", "entities"],
        normalize(data, (x) => x.id)
      );
    }

    case APPOINTMENT_STATUSES_LOAD_FAILED: {
      const error = action.payload;

      return state
        .setIn(["status"], LOADING_STATUSES.fail)
        .setIn(["error"], error);
    }

    default:
      return state;
  }
}
