import { createSlice, combineReducers } from "@reduxjs/toolkit";

import tableReducer from "./EventsTable/eventsTableSlice";

const initialState = {
  error: false,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    table: tableReducer,
  },
});

export const selectError = (state) => state.events.error;

export default eventsSlice.reducer;
