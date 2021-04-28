import { Record } from "immutable";

import normalize from "utils/normalize";
import LOADING_STATUSES from "constants/loadingStatuses";
import ACTION_TYPES from "./actionTypes";

const InitialState = Record({
  status: LOADING_STATUSES.idle,
  error: null,

  dataSource: Record({
    entities: Record({})(),
  })(),
});

const { USERS_LOAD, USERS_LOAD_SUCCEED, USERS_LOAD_FAILED } = ACTION_TYPES;

export default function reducer(state, action) {
  if (!(state instanceof InitialState)) {
    return new InitialState();
  }

  switch (action.type) {
    case USERS_LOAD:
      return state.setIn(["status"], LOADING_STATUSES.loading);

    case USERS_LOAD_SUCCEED: {
      const data = action.payload;
      return state.setIn(["status"], LOADING_STATUSES.idle).setIn(
        ["dataSource", "entities"],
        normalize(data, (x) => x.id),
      );
    }

    case USERS_LOAD_FAILED: {
      const error = action.payload;
      return state
        .setIn(["status"], LOADING_STATUSES.fail)
        .setIn(["error"], error);
    }

    default:
      return state;
  }
}
