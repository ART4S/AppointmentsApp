/* eslint-disable arrow-body-style */
import { produce } from "immer";

export default function createReducer(reducerObject) {
  const composedReducer = Object.entries(reducerObject).reduce(
    (prev, [actionType, actionMethod]) => {
      return {
        ...prev,
        [actionType]: (state, action) =>
          produce(state, (draft) => {
            actionMethod.apply(this, [draft, action]);
          }),
      };
    },
    {},
  );

  return (state, action) => composedReducer[action.type](state, action);
}
