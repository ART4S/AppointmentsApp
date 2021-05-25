import { combineReducers } from "@reduxjs/toolkit";

import tableReducer from "./EventsTable/eventsTableSlice";

export default combineReducers({
  table: tableReducer,
});
