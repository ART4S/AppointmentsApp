import { Record } from "immutable";

import listReducer from "./list/reducer";

const initialState = Record({
  list: Record({})(),
})();

function reducer(state = initialState, action) {
  let nextState = state;

  const list = listReducer(state.list, action);

  if (nextState.list !== list) {
    nextState = nextState.setIn(["list"], list);
  }

  return nextState;
}

export default reducer;
