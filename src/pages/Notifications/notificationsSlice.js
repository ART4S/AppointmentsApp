import { combineReducers } from "@reduxjs/toolkit";

import tableReducer from "./NotificationsTable/notificationsTableSlice";

export default combineReducers({
  table: tableReducer,
});
