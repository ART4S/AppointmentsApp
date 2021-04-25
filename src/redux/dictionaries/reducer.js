import { Record } from "immutable";

import appointmentStatusesReducer from "./appointmentStatuses/reducer";

const initialState = Record({
  appointmentStatuses: Record({})(),
})();

export default function reducer(state = initialState, action) {
  let nextState = state;

  const appointmentStatuses = appointmentStatusesReducer(
    state.appointmentStatuses,
    action
  );

  if (nextState.appointmentStatuses !== appointmentStatuses) {
    nextState = nextState.setIn(["appointmentStatuses"], appointmentStatuses);
  }

  return nextState;
}
